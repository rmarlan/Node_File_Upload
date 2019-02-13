const mongoose = require('mongoose');

var dbConnection = require('./db');
var conn1 = dbConnection.conn1;
var conn2 = dbConnection.conn2;

const doc_Schema = new mongoose.Schema({
  timestamp: String,
  name: String,
  rating: Number,
  review: String 
  });

const openingTimeSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true
  }
});

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  facilities: [String],
  coords: {
    type: [Number],
    index: '2dsphere'
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

const Loc = conn1.model('Location', locationSchema);
doc_model = conn2.model('docs',doc_Schema);
