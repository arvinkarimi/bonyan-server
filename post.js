// models/Book.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: true
  },
  titleFa: {
    type: String,
    required: true
  },
  titleRu: {
    type: String,
    required: true
  },
  textEn: {
    type: String,
    required: true
  },
  textFa: {
    type: String,
    required: true
  },
  textRu: {
    type: String,
    required: true
  },
  image: {
    type:String
  }


});

module.exports = Post = mongoose.model('post', PostSchema);