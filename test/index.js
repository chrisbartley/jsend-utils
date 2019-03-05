const should = require('should');
const JSendError = require('../index').JSendError;
const JSendClientError = require('../index').JSendClientError;
const JSendClientValidationError = require('../index').JSendClientValidationError;
const JSendServerError = require('../index').JSendServerError;

describe("Error subclasses", function() {

   describe("JSendError", function() {
      const jsendObj = {
         data : { foo : "bar", bif : { boz : "baz" } },
         message : "This is the message"
      };

      const err = new JSendError(jsendObj);

      it("Should be an instance of Error", function() {
         (err instanceof Error).should.be.true();
      });

      it("Should be an instance of JSendError", function() {
         (err instanceof JSendError).should.be.true();
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(err.data).eql(jsendObj);
      });

      it("Should have the message property set", function() {
         err.should.have.property("message", jsendObj.message);
      });

   });

   describe("JSendClientError", function() {

      const err1Obj = { message : "You messed up", data : { you : "sent bad data" } };
      const err2Obj = { message : "You messed up again!", data : { you : "sent invalid data" } };
      const err1 = new JSendClientError(err1Obj.message, err1Obj.data);
      const err2 = new JSendClientError(err2Obj.message, err2Obj.data, 422);

      it("Should be an instance of Error", function() {
         (err1 instanceof Error).should.be.true();
         (err2 instanceof Error).should.be.true();
      });

      it("Should be an instance of JSendError", function() {
         (err1 instanceof JSendError).should.be.true();
         (err2 instanceof JSendError).should.be.true();
      });

      it("Should be an instance of JSendClientError", function() {
         (err1 instanceof JSendClientError).should.be.true();
         (err2 instanceof JSendClientError).should.be.true();
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(err1.data).eql({ code : 400, status : "error", message : err1Obj.message, data : err1Obj.data });
         should(err2.data).eql({ code : 422, status : "error", message : err2Obj.message, data : err2Obj.data });
      });

      it("Should have the message property set", function() {
         err1.should.have.property("message", err1Obj.message);
         err2.should.have.property("message", err2Obj.message);
      });

   });

   describe("JSendClientValidationError", function() {

      const err1Obj = { message : "You messed up", data : { you : "sent bad data" } };
      const err1 = new JSendClientValidationError(err1Obj.message, err1Obj.data);

      it("Should be an instance of Error", function() {
         (err1 instanceof Error).should.be.true();
      });

      it("Should be an instance of JSendError", function() {
         (err1 instanceof JSendError).should.be.true();
      });

      it("Should be an instance of JSendClientError", function() {
         (err1 instanceof JSendClientError).should.be.true();
      });

      it("Should be an instance of JSendClientValidationError", function() {
         (err1 instanceof JSendClientValidationError).should.be.true();
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(err1.data).eql({ code : 422, status : "error", message : err1Obj.message, data : err1Obj.data });
      });

      it("Should have the message property set", function() {
         err1.should.have.property("message", err1Obj.message);
      });

   });

   describe("JSendServerError", function() {

      const err1Obj = { message : "Ooops.  Something went seriously wrong", data : { us : "sorry about that" } };
      const err2Obj = { message : "Come back later!", data : { advice : "coming soon...come back later" } };
      const err1 = new JSendServerError(err1Obj.message, err1Obj.data);
      const err2 = new JSendServerError(err2Obj.message, err2Obj.data, 501);

      it("Should be an instance of Error", function() {
         (err1 instanceof Error).should.be.true();
         (err2 instanceof Error).should.be.true();
      });

      it("Should be an instance of JSendError", function() {
         (err1 instanceof JSendError).should.be.true();
         (err2 instanceof JSendError).should.be.true();
      });

      it("Should be an instance of JSendServerError", function() {
         (err1 instanceof JSendServerError).should.be.true();
         (err2 instanceof JSendServerError).should.be.true();
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(err1.data).eql({ code : 500, status : "fail", message : err1Obj.message, data : err1Obj.data });
         should(err2.data).eql({ code : 501, status : "fail", message : err2Obj.message, data : err2Obj.data });
      });

      it("Should have the message property set", function() {
         err1.should.have.property("message", err1Obj.message);
         err2.should.have.property("message", err2Obj.message);
      });

   });

});