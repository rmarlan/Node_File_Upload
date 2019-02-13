const mongoose = require('mongoose');
var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bobmethod = function (req, res) {

  var datetime = require('node-datetime');
  var dt = datetime.create();
  var formatted = dt.format('m/d/Y H:M:S');
  ts = String(formatted)
  console.log ("this is the date:  ", ts)

  const newdoc = new doc_model( {
    timestamp: ts,
    my_text: 'silly text'
    });
  
   // newdoc.save().then(() => console.log('meow'));
  
  console.log ("made it here")

  res
              .status(201)
              .json("hello moto");

  return
}


/*
const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}
*/


/* GET 'doGetData' page */
const doGetData =  function(req, res) {
  console.log ("  ");
  console.log ("running doGetData in ctrlDataIoApi");


  const doc_Schema = new mongoose.Schema({
    timestamp: String,
    name: String,
    rating: Number,
    review: String 
    });
  let dbAPP = 'mongodb://localhost/api1';
  var conn2 = mongoose.createConnection(dbAPP);
  var doc_model = conn2.model('docs',doc_Schema);

  // doc_model.find(function (err, data) {
  //model.findOne().sort({ field: -_id }).limit(1)

  //doc_model.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, data) {

  doc_model.findOne().sort({created_at: 1}).exec(function(err, data) {

  //doc_model.findOne().sort({ date: -1 }).limit(1).exec((err, data) {

  //doc_model.findOne  (function (err, data) {

    if (err) console.log("this is the error:", err);
    console.log("here is the mongo data", data);
    console.log ("data request:  ", data._id);

 

    console.log(JSON.stringify(data));

  res
    .status(200)
    .render('dataView', {
    title: data,
    header: JSON.stringify(data)}); 

});
/*
  res
  .status(200)
  .json("doc retrive - OK"); */


}





/* POST 'doAddData' page */
const doAddData =  function(req, res) {

  console.log ("  ");
  console.log ("running doAddData in ctrlDataIoApi");

  console.log ("req data:  ", req.body.name, req.body.rating, req.body.review);

  var datetime = require('node-datetime');
  var dt = datetime.create();
  var formatted = dt.format('m/d/Y H:M:S');
  ts = String(formatted)
  console.log ("this is the date:  ", ts)

  const postdata = {
    name: ts,  //req.body.name
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  };

  const newdoc = new doc_model( {
    timestamp: ts,
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
    });
  
  console.log ("Here is the web data  :")
  console.log (req.body.name,"  ",req.body.rating,"   ",req.body.review);

  newdoc.save()

  //  res.redirect('../bob');
  res
  .status(201)
  .json("hello moto");


}


const _renderReviewForm = function(req, res, locDetail) {
  res.render('data-input-form', {
    title: `Data input page title`,
    pageHeader: { title: `Data input screen` },
    error: req.query.err
  });
};


const _showError = function (req, res, status) {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear. Looks like we can\'t find this page. Sorry.'; 
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};



module.exports = {
  bobmethod,
  doGetData,
  doAddData
};