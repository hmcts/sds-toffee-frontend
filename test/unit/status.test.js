const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const status = require('../../app/status');

describe('Routes', () => {
  describe('GET Status', () => {
    it('should respond', () => {
      let req, res, spy;

      req = res = {};
      spy = res.send = res.json = sinon.spy();

      status(req, res);

      expect(spy.calledOnce).to.equal(true);
    });
  });
});
