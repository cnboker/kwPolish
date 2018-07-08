var jobAction = require('./jobAction')

var logger = require('../logger')

const jobContext = {
    busy: false,
    tasks: [],
}

module.exports = jobContext;

jobContext.addTask = function (task) {
    this.tasks.push(task);
}

jobContext.popTask = function () {
    return this.tasks.shift();
}

jobContext.popScanTask = function(){
    logger.info('tasks count=',this.tasks.length)
    var tasks = this.tasks.filter(function (task) {
        return task.action == jobAction.SCAN
    });
    var task = tasks.shift();
    if(task){
        this.removeById(task.doc._id)
    }
    logger.info('remove tasks count=',this.tasks.length)
    return task;
}

jobContext.hasScanTask = function () {
    this.scanTasks().length > 0
}

jobContext.scanTasks = function(){
    return this.tasks.filter(function (task) {
        return task.action == jobAction.SCAN
    });
}

jobContext.removeById = function (id) {
    this.tasks = this.tasks.filter(function (task) {
        return task.doc._id != id
    });
}

jobContext.dirty = function(id){
    var tasks = this.tasks.filter(function(item){
        return item.doc._id == id
    });
    if(tasks.length > 0){
        tasks[0].doc.state = 'dirty'
        console.log('dirty', tasks[0].doc)
    }
}

jobContext.clean = function () {
    for(var item of this.tasks){
        item.state = 'dirty'
    }
}