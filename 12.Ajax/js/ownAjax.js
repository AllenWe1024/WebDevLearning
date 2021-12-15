function resolveData(data) {
  var arr = []
  for (var k in data) {
    var str = k + '=' + data[k]
    arr.push(str)
  }

  return arr.join('&')
}

// var res = resolveData({ name: 'zs', age: 20 })
// console.log(res)

function ownAjax(options) {
  var xhr = new XMLHttpRequest()
  // 把外界传递过来的参数对象，转换为 查询字符串
  var qs = resolveData(options.data)

  // 判断请求
  if (options.method.toUpperCase() === 'GET') {
    // console.log(options.method);
    // 发起GET请求
    xhr.open('GET', options.url + '?' + qs)
    xhr.send()
  } else if (options.method.toUpperCase() === 'POST') {
    // 发起POST请求
    xhr.open('POST', options.url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(qs)
  }

  // 监听请求状态改变的事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText)
      // 执行回调函数（success）
      options.success(result)
    }
  }
}
