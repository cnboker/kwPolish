var moment = require('moment')
const KEYWORD_KEY = 'kwPoslish_tasks'

var setKeywordLocalStorage = function (arr) {
  var data = {
    date: moment().format('YYYY-MM-DD'),
    arr
  }
  global.nodeStorage.setItem(KEYWORD_KEY, data);
}

var getKeywordLocalStorage = function () {
  var data =  global.nodeStorage.getItem(KEYWORD_KEY);
  if (data == null) return [];
  if (data.date != moment().format('YYYY-MM-DD')) return [];
  return data.arr;
}

function removeItem(id) {
  var arr = getKeywordLocalStorage();
  arr = arr.filter(function (item) {
    return item._id != id
  });
  setKeywordLocalStorage(arr);
}

function del(){
  global.nodeStorage.removeItem(KEYWORD_KEY)
}

module.exports = {
  setKeywordLocalStorage,
  getKeywordLocalStorage,
  removeItem,
  del
}