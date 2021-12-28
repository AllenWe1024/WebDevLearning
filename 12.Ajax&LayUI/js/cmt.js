function getCommentList() {
  $.ajax({
    method: 'GET',
    url: 'http://www.liulongbin.top:3006/api/cmtlist',
    success: function (res) {
      console.log(res);
      if (res.status !== 200) return alert('获取评论列表失败！')
      let rows = []
      // console.log(rows);
      $.each(res.data, function (i, item) {
        let str = '<li class="list-group-item">        <span class="badge" style="background-color:#F0AD4E;">' + item.time + '</span>  <span class="badge" style="background-color: #5BC0DE;">' + item.username + '</span>' + item.content + '</li>'
        rows.push(str)
      })
      // let str ='<li class="list-group-item">        <span class="badge" style="background-color:#F0AD4E;">评论时间：</span>  <span class="badge" style="background-color: #5BC0DE;">评论人：</span>1      </li>'
      // rows.push(str)
      $('#cmt-list').empty().append(rows.join(''))
    }
  })
}
getCommentList()

$(function () {
  $('#formAddCmt').submit(function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    console.log(data);
    $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
      if (res.status !== 201) {
        return alert('发表评论失败！')
      }
      getCommentList()
      $('#formAddCmt')[0].reset() //转成原生对象，reset直接清空，是原生的函数

    })
  })
})