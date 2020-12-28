const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  test('Create an issue with every field', done => {
    chai.request(server)
        .post('/api/issues/apitest')
        .query({
          issue_title: 'Title',
          issue_text: 'Issue Text',
          created_by: 'Created By',
          assigned_to: 'Assigned To',
          status_text: 'Status Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
  });
  
});
