require('should');
require('should-http');

const request = require('supertest');
const { server } = require('../../server');

describe('Testing readiness', () => {
  it('should respond 200 OK ', function (done) {
    request(server)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.equal('UP');
        server.close();
        done();
      });
  });
});


describe('Testing liveness', () => {
    it('should respond 200 OK ', function (done) {
        request(server)
            .get('/health/liveness')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.equal('UP');
                server.close();
                done();
            });
    });
});

