process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Keyword = require('../api/Keyword/Model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should();
let expect = chai.expect;
var dbInit = require('../../data/scripts/init')

const access_token = require('../auth').access_token
chai.use(chaiHttp)

describe('keyword', () => {

  beforeEach(function(done){
    dbInit(function(){
      done();
    });
  });

  describe("/api/kwTask/tasks", () => {
    it('it should return json list', (done) => {
      chai.request(server)
        .get('/api/kwTask/tasks')
        .set('Authorization', `Bearer ${access_token}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log('res.body', res.body);
          expect(err).to.be.null;
          expect(res).to.be.json;
          expect(res.body).to.have.lengthOf(1);
          done();
        });
    })
  });

  describe('/api/keywords/create',()=>{
    it('throw 400 if free user keywords count great than 3',(done)=>{
      chai.request(server)
      .post('/api/keywords')
      .set('Authorization',`Bearer ${access_token}`)
      .send({
        keyword:'abcd',
        link:'ioliz.com',
        engine:'baidu'
      })
      .end((err,res)=>{
        res.should.have.status(400)
        console.log('/api/keywords/create',res.body)
        done();
      })
    })
  })


  describe('/api/kwTask/rank', () => {
    it('set rank = 30,should return rank=30', (done) => {
      //add keyword
      let keyword = new Keyword({
        keyword: 'test',
        link: 'ioliz.com',
        originRank: 0,
        dynamicRank: 0
      });
      keyword.save()
        .then((doc) => {
          if (doc) {
            chai.request(server)
              .post('/api/kwTask/rank')
              .set('Authorization', `Bearer ${access_token}`)
              .send({
                _id: doc._id,
                rank: 30
              })
              .end((err, res) => {
                console.log('body', err)
                res.should.have.status(200);
                expect(err).to.be.null;
                expect(res.body.originRank).to.be.equal(30);
                done();
              });
          }
          // done();
        });

    })
    //it end
  })
  //describle end

  describe('/api/kwTask/polish', () => {
    it('set dynamicRank = 20, should return dynamicRank =20', (done) => {
      let keyword = new Keyword({
        keyword: 'test',
        link: 'ioliz.com',
        originRank: 0,
        dynamicRank: 0,
        polishedCount: 0,
        user:'scott',
        engine:'baidu'
      });
      keyword.save({new:true})
        .then((doc) => {
          console.log('polish:',doc)
          if (doc) {
            chai.request(server)
              .post('/api/kwTask/polish')
              .set('Authorization', `Bearer ${access_token}`)
              .send({
                _id: doc._id,
                rank: 20
              })
              .end((err, res) => {
                //console.log('body----', res.body)
                res.should.have.status(200);
                expect(err).to.be.null;
                expect(res.body.dynamicRank).to.be.equal(20);
                expect(res.body.polishedCount).to.be.equal(1);
                done();
              });
          }
        });
    })
  })

})