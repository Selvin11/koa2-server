const dbUtils = require('./../middlewares/db-util')

const User = {
  /**
   * 创建用户
   * @param {object} model 用户数据
   */
  async create (model) {
    let result = await dbUtils.insertData('user', model)
    return result
  },
  /**
   * 查找用户
   * @param {object} options 查找条件参数
   */
  async findOne (options) {
    let sql = `SELECT * FROM user WHERE name="${options.name}" limit 1`
    let result = await dbUtils.query(sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = User
