const fs = require('fs')

fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) {
  if (err) { // err不为null，则读取失败
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})
