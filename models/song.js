'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SongSchema = new Schema({
  "number": Number,
  "album": { type: Schema.ObjectId, ref: 'Album' },
  "name": String,
  "file": String,
  "duration": String
});

module.exports = mongoose.module('Song', SongSchema)
