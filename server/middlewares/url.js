/**
 * url help methods
 */
module.exports = {
  /**
   * 获取 location.search和location.hash的值
   * access_token=1243f3b7bb8575fd26c215f497cf7fa5cb949329&scope=&token_type=bearer
   * @returns [Object] 对象
   */
  getSearch (url) {
    let o = {}
    let item
    url = url.split('&')
    url.forEach(val => {
      item = val.split('=')
      o[item[0]] = item[1]
    })
    return o
  },
  /**
   * @param {Object} param 将要转为URL参数字符串的对象
   * @param {Object} key URL参数字符串的前缀
   * @param {Boolean} encode true/false 是否进行URL编码,默认为true
   * @source http://www.tuicool.com/articles/uaIr2mj
   * return URL参数字符串
   */
  urlEncode (param, key, encode) {
    if (param == null) {
      return ''
    }
    if (!key) {
      key = ''
    }
    var paramStr = ''
    var t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? window.encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        var k = key === null ? i : key + (param instanceof Array ? '-' + i + '-' : i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  }
}
