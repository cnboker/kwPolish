//用户自己的数据管理队列
var users = {};

//用户加入
function userJoin(user) {
  users.user = {
    joinTime:new Date(),
    state : 1,
    user
  }

}

//用户离开
function userLeave(user) {
  users[user].leaveTime = new Date();
  users[user].state = 0;
}

function onlineUsers() {
  return Object.values(users).filter(x=>x.state === 1).map(x=>x.name)
}

function todayUsers(){
  return users;
}

module.exports = {
  userJoin,
  userLeave,
  onlineUsers,
  todayUsers
};
