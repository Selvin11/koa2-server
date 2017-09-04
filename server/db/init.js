// 创建初始数据库
const dbUtils = require('./../middlewares/db-util')
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, '/sql/user.sql'), 'utf8', (err, data) => {
  if (err) throw err
  dbUtils.query(data)
  console.log('Create table success! Please press Ctrl+C to quit.')
})
