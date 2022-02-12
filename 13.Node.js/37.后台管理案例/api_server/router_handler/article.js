// 导入处理路径的 path 核心模块
const path = require('path')
// 导入数据库操作模块
const db = require('../db/index')

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  // 手动判断是否上传了文章封面
  // 如果没有req.file或者req.file.fieldname !== 'cover_img'
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  }

  const sql = `insert into ev_articles set ?`
  // 执行 SQL 语句
  db.query(sql, articleInfo, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
    // 发布文章成功
    res.cc('发布新文章成功', 0)
  })
}
// 删除文章的处理函数
exports.deleteArticleById = (req, res) => {
  // 定义删除文章的 SQL 语句
  const sql = `update ev_articles set is_delete=1 where id=?`
  // 调用 `db.query()` 执行删除文章分类的 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    // console.log(req);
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除文章失败！')
    // 删除文章分类成功
    res.cc('删除文章成功！', 0)
  })
}

// 根据 Id 获取文章的处理函数
exports.getArticleById = (req, res) => {
  // res.send('ok')
  // 定义根据 Id 获取文章
  const sql = `select * from ev_articles where id=?`
  // 调用 `db.query()` 执行 SQL 语句：
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')
    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '获取文章数据成功！',
      data: results[0],
    })
  })
}

// 更新文章的处理函数
exports.updateArticleById = (req, res) => {
  // 定义查询 文章名称 是否被占用的 SQL 语句（在剩余的语句中）
  const sql = `select * from ev_articles where Id<>? and title=?`
  // 执行查重操作
  db.query(sql, [req.body.Id, req.body.title], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断 名称 是否被占用
    if (results.length === 1 && results[0].title === req.body.title) return res.cc('文章名被占用，请更换后重试！')

    // res.cc('ok')
    // 定义更新文章的 SQL 语句
    const sql = `update ev_articles set ? where Id=?`
    // 调用 `db.query()` 执行 SQL 语句
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
          // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
          // 更新文章分类成功
      res.cc('更新文章分类成功！')
    })
  
  })
}
