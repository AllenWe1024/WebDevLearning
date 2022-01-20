const tools = require('./customTools')

// 格式化时间的功能
const dtStr = tools.dateFormat(new Date())
console.log(dtStr)
console.log('-----------')

const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
const str = tools.htmlEscape(htmlStr)
console.log(str)
console.log('-----------')