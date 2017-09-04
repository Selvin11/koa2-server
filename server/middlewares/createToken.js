const jwt = require('jsonwebtoken')

module.exports = name => {
  let token = jwt.sign(
    {
      name: name
    },
    'secret',
    {
      expiresIn: '10s'
    })
  return token
}
