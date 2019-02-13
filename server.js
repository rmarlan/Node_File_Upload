var express = require('express');
var formidable = require('formidable');
var app = express();

// app.use(bodyParser({limit: '200mb'}));


var path = require('path');

//  var filename = path.join(__dirname,'../upload/' ...

app.get('/upload', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function (req, res){
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

app.listen(3000);
