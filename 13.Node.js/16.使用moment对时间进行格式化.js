// 1. 导入需要的包
// 注意：导入的名称，就是装包时候的名称
const moment = require('moment')

const dt = moment().format('YYYY-M-DD HH:mm:ss')
// MM表示补零，M表示不补零
console.log(dt)
