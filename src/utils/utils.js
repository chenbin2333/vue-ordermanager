// 工具js文件

// 获取中国时区时间
// 传入UTC字符串时间
export let getChinatime = (utcTime) => {
  let date = (typeof utcTime == 'string' ? new Date(utcTime) : utcTime)

  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}