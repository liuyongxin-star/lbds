const mongoose = require('mongoose')

const dburl = 'mongodb://devUser:Wg3zwtC8@150.158.109.24:27017/test999?authSource=admin'

// 链接MongoDB数据库
const db = mongoose.connect(dburl)
// 链接成功
mongoose.connection.on("connected", function(err,client) {
    console.log(client)
    console.log("MongoDB connected success")
})
// 链接失败
mongoose.connection.on("error", function() {
    console.log("MongoDB connected error")
})
// 断开了
mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connected disconnected")
})

module.exports = db;