const mongoose = require('mongoose');

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
              .json("hello moto  ",ts);

  return
}

app.get('/upload', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

/* uploader function */
const uploader = function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req);;

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/upload/' + file.name;
        console.log ("starting upload - filename: ", file.name);
    });

    form.on('file', function (name, file){
        console.log('Uploaded: ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});



}

/* GET 'addData' page */
const addData = function(req, res){
  console.log("running addData");
  { _renderReviewForm(req, res, 'responseData'); };
};


/* POST 'doAddData' page */
const doAddData = function(req, res) {

  console.log ("  ");
  console.log ("running doAddData in alamo");
  console.log(req.body.name,req.body.rating,req.body.review);

  const postdata = {
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  };

  var datetime = require('node-datetime');
  var dt = datetime.create();
  var formatted = dt.format('m/d/Y H:M:S');
  ts = String(formatted)
  console.log ("this is the date:  ", ts)
  
  
  /* replace with api call

  newdoc.save().then(() => {
    console.log ("       "); 
    console.log('meow - data saved!');
    console.log ("       ");
  */
  
  const request = require('request');
  const apiOptions = {
  server : 'http://localhost:3000'
  };
  if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
  }

  const path = '/api/data'; 

  const newdoc = new doc_model( {
    timestamp: ts,
    my_text: req.body.review
  });


  const requestOptions = {
  url : 'http://localhost:3000/api/data', 
  method : 'POST', 
  json : postdata 
  };


//  console.log (apiOptions.server,"   ", newdoc);

  request( requestOptions, (err, {statusCode}, body) => {
    if (statusCode === 201) { 
      console.log ('good status - 201');
    
    } else { 
      showError(req, res, statusCode); 
    }
  });




  //res
  //            .status(201)
  //            .json("hello moto");

  res.redirect('/dataAdd');
  console.log ("Here is the web data  :")
  console.log (req.body.name,"  ",req.body.rating,"   ",req.body.review);

}  


const _renderReviewForm = function(req, res, locDetail) {
  res.render('data-input-form', {
    title: `Data input page title`,
    pageHeader: { title: `Data input srceen` },
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
  addData,
  doAddData
};