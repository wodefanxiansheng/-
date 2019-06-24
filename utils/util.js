const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const previewImage = (e,urlslist) =>{
  var current = e.target.dataset.src;
  console.log(e)
  wx.previewImage({
    current: current, // 当前显示图片的http链接  
    urls: this.data.urlslist // 需要预览的图片http链接列表  
  })
}
// es6 数组去重
function dedupe(array){
  return Array.from(new Set(array));
 }
// 删除数组指定元
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
  this.splice(index, 1);
  }
}
module.exports = {
  formatTime: formatTime,
  previewImage:previewImage,
  dedupe:dedupe,
  remove:Array.remove
}

