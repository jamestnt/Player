'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArtistSchema = new Schema({
  "name": String,
  "description": String,
  "image": String
});

module.exports = mongoose.module('Artist', ArtistSchema)
