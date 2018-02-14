'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlbumSchema = new Schema({
  "title": String,
  "artist": { type: Schema.ObjectId, ref: 'Artist' },
  "description": String,
  "image": String,
  "year": Number
});

module.exports = mongoose.module('Album', AlbumSchema)
