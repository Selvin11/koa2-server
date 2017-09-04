const config = require('../db/config').database
const mysql = require('mysql') // node中操作mysql的包

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
})

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, results, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
          connection.release()
        })
      }
    })
  })
}

let createTable = sql => {
  return query(sql, [])
}

// 通过ID查找数据
let findDataById = (table, id) => {
  let _sql = 'SELECT * FROM ?? WHERE id = ?'
  return query(_sql, [table, id])
}

// 分页查找
let findDataByPage = (table, keys, start, end) => {
  let _sql = 'SELECT ?? FROM ??  LIMIT ? , ?'
  return query(_sql, [keys, table, start, end])
}

// 插入
let insertData = (table, values) => {
  let _sql = 'INSERT INTO ?? SET ?'
  return query(_sql, [table, values])
}

// 更新
let updateData = (table, values, id) => {
  let _sql = 'UPDATE ?? SET ? WHERE id = ?'
  return query(_sql, [table, values, id])
}

// 删除
let deleteDataById = (table, id) => {
  let _sql = 'DELETE FROM ?? WHERE id = ?'
  return query(_sql, [table, id])
}

let select = (table, keys) => {
  let _sql = 'SELECT ?? FROM ?? '
  return query(_sql, [keys, table])
}

let count = (table) => {
  let _sql = 'SELECT COUNT(*) AS total_count FROM ?? '
  return query(_sql, [table])
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count
}
