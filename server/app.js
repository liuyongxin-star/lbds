const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const dbsConfig = require('./config/dbs.config')
const { v1 } = require('./services');
// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})
app.use(v1.routes());
module.exports = app.listen(process.env.PORT || config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
