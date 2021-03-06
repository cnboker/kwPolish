'use strict';

module.exports = function(app){
  var answerCtl = require('./AnswerController');
  var commentCtl = require('./CommentController')
  var followCtl = require('./FollowController')
  var questionCtl = require('./QuestionController')
  
  app.route('/api/questions')
  .get(questionCtl.list)
  
  app.route('/api/question/create')
  .post(questionCtl.create)

  app.route('/api/questions/:id')
  .get(questionCtl.read)
  .put(questionCtl.update)
  .delete(questionCtl.del)

  app
  .route('/api/topics/cloud')
  .get(questionCtl.cloud)

  app.route('/api/answers')
  .post(answerCtl.create)

  app.route('/api/answers/:id')
  .get(answerCtl.read)
  .delete(answerCtl.del)

  app.route('/api/comments')
  .post(commentCtl.create)

  app.route('/api/comments/:id')
  .delete(commentCtl.del)

  app.route('/api/follows')
  .post(followCtl.list) //searchTerm
  app.route('/api/follows/:id')
  .delete(followCtl.read)
}