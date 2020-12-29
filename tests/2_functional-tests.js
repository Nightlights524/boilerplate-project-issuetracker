const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  const project = 'apitest';

  test('Create an issue with every field', done => {
    chai.request(server)
      .post(`/api/issues/${project}`)
      .type('form')
      .send({
        issue_title: 'Title',
        issue_text: 'Issue Text',
        created_by: 'Created By',
        assigned_to: 'Assigned To',
        status_text: 'Status Text'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'Issue Text');
        assert.equal(res.body.created_by, 'Created By');
        assert.equal(res.body.assigned_to, 'Assigned To');
        assert.equal(res.body.status_text, 'Status Text');
        assert.equal(res.body.project, project);
        assert.isTrue(res.body.open);
        assert.property(res.body, '_id');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        done();
      });
  });
  
  test('Create an issue with only required fields', done => {
    chai.request(server)
      .post(`/api/issues/${project}`)
      .type('form')
      .send({
        issue_title: 'Title',
        issue_text: 'Issue Text',
        created_by: 'Created By'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'Issue Text');
        assert.equal(res.body.created_by, 'Created By');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        assert.equal(res.body.project, project);
        assert.isTrue(res.body.open);
        assert.property(res.body, '_id');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        done();
      });
  });
  
  test('Create an issue with missing required fields', done => {
    chai.request(server)
      .post(`/api/issues/${project}`)
      .type('form')
      .send({
        issue_title: 'Title',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing');
        done();
      });
  });
  
  test('View issues on a project', done => {
    chai.request(server)
      .get(`/api/issues/${project}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        for (const element of res.body) {
          assert.property(element, '_id');
          assert.property(element, 'project');
          assert.property(element, 'issue_title');
          assert.property(element, 'issue_text');
          assert.property(element, 'created_on');
          assert.property(element, 'updated_on');
          assert.property(element, 'created_by');
          assert.property(element, 'assigned_to');
          assert.property(element, 'open');
          assert.property(element, 'status_text');
        }
        done();
      });
    });
    
  test('View issues on a project with one filter', done => {
    chai.request(server)
    .get(`/api/issues/${project}`)
    .query({issue_text: "Issue description"})
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.isArray(res.body);
      if (res.body.length > 0) {
        for (const element of res.body) {
          assert.equal(element.issue_text, "Issue description");
        }
      }
      done();
    });
  });

  test('View issues on a project with multiple filters', done => {
    chai.request(server)
    .get(`/api/issues/${project}`)
    .query({issue_text: "Issue description", open: true})
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.isArray(res.body);
      if (res.body.length > 0) {
        for (const element of res.body) {
          assert.equal(element.issue_text, "Issue description");
          assert.equal(element.open, true);
        }
      }
      done();
    });
  });

  // Update one field on an issue: PUT request to /api/issues/{project}
  // Update multiple fields on an issue: PUT request to /api/issues/{project}
  
  test('Update an issue with missing _id', done => {
    chai.request(server)
      .put(`/api/issues/${project}`)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');
        done();
      });
  });

  test('Update an issue with no fields to update', done => {
    const requestID = 'dummyID';
    chai.request(server)
      .put(`/api/issues/${project}`)
      .send({_id: requestID})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'no update field(s) sent');
        assert.equal(res.body._id, requestID);
        done();
      });
  });

  test('Update an issue with an invalid _id', done => {
    const requestID = '& % # @';
    chai.request(server)
      .put(`/api/issues/${project}`)
      .send({
        _id: requestID,
        issue_title: 'Invalid',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not update');
        assert.equal(res.body._id, requestID);
        done();
      });
  });
  
  test('Delete an issue', done => {
    chai.request(server)
      .post(`/api/issues/${project}`)
      .send({
        issue_title: 'TO BE DELETED',
        issue_text: 'TO BE DELETED',
        created_by: 'TO BE DELETED'
      })
      .end((err, res) => {
        const id = res.body._id
        chai.request(server)
          .delete(`/api/issues/${project}`)
          .send({_id: id})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully deleted');
            assert.equal(res.body._id, id);
            done();
          });
      });
  });

  test('Delete an issue with an invalid _id', done => {
    const requestID = '& % # @';
    chai.request(server)
      .delete(`/api/issues/${project}`)
      .send({_id: requestID})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not delete');
        assert.equal(res.body._id, requestID);
        done();
      });
  });

  test('Delete an issue with missing _id', done => {
    chai.request(server)
      .delete(`/api/issues/${project}`)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');
        done();
      });
  });
});