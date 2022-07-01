export function add0(n) {
  return n < 10 ? '0' + n : '' + n
}

export const second = 1000
export const minute = 60 * second
export const hour = 60 * minute
export const day = 24 * hour

export function parseTime(D, format = 'yyyy-MM-dd hh:mm') {
  const year = D.getFullYear()
  const month = D.getMonth() + 1
  const date = D.getDate()
  const hours = D.getHours()
  const minutes = D.getMinutes()
  const seconds = D.getSeconds()
  let str = format
  function replace(tpl, val) {
    if (new RegExp(tpl).test(str)) {
      str = str.replace(tpl, val)
    }
  }
  replace('yyyy', year)
  replace('MM', add0(month))
  replace('M', month)
  replace('dd', add0(date))
  replace('d', date)
  replace('hh', add0(hours))
  replace('h', hours)
  replace('HH', add0(hours))
  replace('H', hours)
  replace('mm', add0(minutes))
  replace('m', minutes)
  replace('ss', add0(seconds))
  replace('s', seconds)
  return str
}

export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function Fungetdate(count) {
  var dd = new Date();
  dd.setDate(dd.getDate() + count);//获取p_count天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return m + "-" + d;
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
