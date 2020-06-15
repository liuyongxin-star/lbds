const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync'); // 同步模块
const Memory = require('lowdb/adapters/Memory'); // 存入内存
const path = require('path');
const os = require('os');
const { remote, app } = require('electron');

// 渲染进程和主进程兼容
const APP = process.type === 'renderer' ? remote.app : app; 

const adapter = new FileSync(path.join(os.homedir(), 'datastore.json')); // 存储在本地目录

var db = low(adapter)

// 1 取值  var token = storage.get('key').value();
// 2 设值  storage.set("key", "value").write(); 
module.exports = db; //模块导出，可在其它js文件中引用
