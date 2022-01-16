// 1. 导入 http 模块
const http = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()
// 3. 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function(req, res) {
  console.log('Someone visit our web server.')
  // req 是请求对象，包含了与客户端相关的数据和属性
  // req.url 是客户端请求的 URL 地址
  const url = req.url
  // req.method 是客户端请求的 method 类型
  const method = req.method
  const str = `Your request url is ${url}, and request method is ${method}`
  console.log(str)
  // 调用 res.end() 方法，向客户端响应一些内容
  // res.end(str)
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  // 这是固定的写法
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('完毕')
})
// 4. 启动服务器
server.listen(80, function() {
  console.log('server running at http://127.0.0.1:8080')
})