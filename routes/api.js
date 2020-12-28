'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("SUCCESSFUL DATABASE CONNECTION");
});

const issueSchema = new mongoose.Schema({
  project: String,
  issue_title: String,
  issue_text: String,
  created_on: Date,
  updated_on: Date,
  created_by: String,
  assigned_to: String,
  open: Boolean,
  status_text: String
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = async function (app) {
  app.route('/api/issues/:project')
  
  .get(async function (req, res){
    try {
      const queryObject = Object.assign({project: req.params.project}, req.query);

      const documents = await Issue.find(queryObject).exec();
      // const documents = await Issue.find({project: project}).orFail().exec();
      return res.json(documents);
    }
    catch (error) {
      console.error(error.message);
      return res.send(error.message);
    }
  })
  
  .post(async function (req, res){
    try {
      // First check to make sure the request has all required fields
      if (!Object.prototype.hasOwnProperty.call(req.body, 'issue_title') ||
          !Object.prototype.hasOwnProperty.call(req.body, 'issue_text') ||
          !Object.prototype.hasOwnProperty.call(req.body, 'created_by'))
      {
        return res.json({ error: 'required field(s) missing' });
      }

      let project = req.params.project;
      const createdDate = new Date();
      const issue_title = req.body.issue_title || "";
      const issue_text = req.body.issue_text || "";
      const created_by = req.body.created_by || "";
      const assigned_to = req.body.assigned_to || "";
      const status_text = req.body.status_text || "";

      const newIssue = await Issue.create({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_on: createdDate,
        updated_on: createdDate,
        created_by: created_by,
        assigned_to: assigned_to,
        open: true,
        status_text: status_text
      });

      return res.json(newIssue);
    }
    catch (error) {
      console.error(error.message);
      return res.send(error.message);
    }
  })
  
  .put(async function (req, res){
    try {
      console.log(req.body);

      // First check to make sure the request has the required '_id' field
      if (!Object.prototype.hasOwnProperty.call(req.body, '_id'))
      {
        return res.json({error: 'missing _id'});
      }

      // // Then make sure request has other update fields
      // if (request doesn't have update fields))
      // {
      //   return res.json({error: 'no update field(s) sent', _id: req.body._id });
      // }

      // const project = req.params.project;

      const updatedDoc = await Issue.findByIdAndUpdate(req.body._id, req.body, {new: true}).exec();

      console.log(updatedDoc);

      return res.json({result: 'successfully updated', _id: updatedDoc._id})
    }
    catch (error) {
      console.error(error.message);
      return res.json({error: 'could not update', _id: req.body._id});
    }
  })
  
  .delete(async function (req, res){
    try {
      if (!req.body._id) {
        return res.json({error: 'missing _id' });
      }

      const deletedDoc = await Issue.findByIdAndDelete(req.body._id).exec();

      return res.json({result: 'successfully deleted', '_id': deletedDoc._id});
    }
    catch (error) {
      console.error(error.message);
      return res.json({error: 'could not delete', '_id': req.body._id});
    }
  });
};
