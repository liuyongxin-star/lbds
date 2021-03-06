import {
    app,
    protocol,
    BrowserWindow,
    ipcMain,
    session
} from 'electron'
import storage from "@/utils/datastore"
import {
    createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

let win
let serverProcess = null;
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

async function createWindow() {
    var width = 1122
    var height = 670
    var token = storage.get('token').value();
    if (!token) {
        width = 400
        height = 320
    }
    win = new BrowserWindow({
        width: width,
        height: height,
        resizable: false,
        show: false, // 一开始是false,loadpage加载完毕的时候为true
        frame: false, // 关闭window自带的关闭等功能以及工具栏， 无边框窗口是不允许拖动的，可通过设置样式让其可拖动，样式见index.html中
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false //允许跨域
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.show();
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // 开启渲染进程中的调试模式
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        win.show();
        createProtocol('app');
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null;
        app.quit();
    })

    win.on('close', function (event) {
        // 关闭前差一个弹窗，询问是否退出程序 *************；
        stopServer(); //停止后台服务

    })
    // console.log(token,"token")



}





function initApp() {
    createWindow()
}

// 窗口 最小化
ipcMain.on('window-min', function () { // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.minimize();
})


ipcMain.on('window-max', function(event, obj) { // 接收渲染进程的消息和数据  
    if (obj.winFlag) { // val为 true，代表我想进行最大化窗口操作，此时 调用最大化函数
        win.maximize();
    } else {
        win.setContentSize(1122, 670); //重新设置窗口客户端的宽高值（例如网页界面），这里win.setSize(x,y)并不生效。
        win.center(); // 窗口居中
    }
})

// 关闭窗口
ipcMain.on('window-close', function () {
    win.close();
})

// 设置窗口
ipcMain.on('setMainWindow', function (e, data) {
    console.log("收到改变大小", data.width)
    win.setContentSize(data.width, data.height);
    win.center()

})


// 所有窗口都关闭的时候触发，windows和Linux中，此时应用也应退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        initApp();
    }
})


if (isDevelopment) {
    // electron完成初始化的时候触发
    app.on('ready', async () => {

        startServer(); // 启动服务器
        initApp();

    })
} else {
    //限制只能开启一个应用(4.0以上版本)；
    //当第二个实例被执行并且调用 app.requestSingleInstanceLock() 时，这个事件将在你的应用程序的首个实例中触发
    const goTheLock = app.requestSingleInstanceLock();
    if (!goTheLock) {
        app.quit();
    } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            if (win) {
                if (win.isMinimized()) win.restore()
                win.focus()
            }
        })
        app.on('ready', async () => {
            startServer();
            initApp();
        })
    }
}

//启动本项目中的服务器
function startServer() {
    let cmdStr = "cnpm install" // 要运行的命令 
    const serverPath = isDevelopment ? "./server" : "./server" // 注意开发环境和线上环境的路径不同；

    serverProcess = require('child_process').exec(cmdStr, {
        cwd: serverPath
    })

    cmdStr = 'npm run start'
    runExec(cmdStr)

    function runExec(cmdStr) {
        //exec 函数 第一个参数是要执行的命令，第二个函数是配置选项，第三个参数是回调函数，配置项中常用到 子进程的工作目录
        serverProcess = require('child_process').exec(cmdStr, {
            cwd: serverPath
        })

        serverProcess.stdout.on('data', function (data) {
            console.log("启动服务器成功 stdout:" + data) // 打印正常的后台可执行程序输出
        })
        serverProcess.stderr.on('data', function (data) {
            console.log('stderr:' + data) //打印错误的后台可执行程序输出
        })
        serverProcess.on('close', function (code) {
            console.log('out code:' + code) // 退出之后的输出
        })
    }
}

// 关闭项目中的所有进程，主要是为了关闭刚刚启动的服务器进程。
function stopServer() {
    console.log("Kill server process.....")
    const kill = require('tree-kill'); //  tree-kill是一个插件，需要安装，在项目中已经用 yarn add tree-kill 命令安装。
    if (serverProcess) {
        kill(serverProcess.pid, 'SIGTERM', function (err) { //终止进程树，杀死所有进程，包括根进程。
            console.log('Killed');
            serverProcess = null;
            win = null;
            app.quit();
        })
    }
}

app.stopServer = stopServer;




if (isDevelopment) {

    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}