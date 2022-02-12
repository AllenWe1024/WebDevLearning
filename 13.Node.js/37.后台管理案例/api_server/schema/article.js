// 导入定义验证规则的模块
const joi = require('joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
// allow允许为空
const content = joi.string().required().allow('')
// valid('已发布', '草稿')指定两个可选值
const state = joi.string().valid('已发布', '草稿').required()
// 定义 文章Id 的校验规则
const id = joi.number().integer().min(1).required()


// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}

// 校验规则对象 - 删除文章
exports.delete_article_schema = {
  params: {
    id,
  },
}

// 校验规则对象 - 根据 Id 获取文章
exports.get_article_schema = {
  params: {
    id,
  },
}

// 校验规则对象 - 更新
exports.update_article_schema = {
  body: {
    Id: id,
    title,
    cate_id,
    content,
    state,
  },
}