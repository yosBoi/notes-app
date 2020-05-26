const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title:{
    type: String,
    maxlength: 12
  },
  content:{
    type: String,
    required: true,
  },
  color: {
    type: String,
    minlength: 7,
    maxlength: 7
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 24
  },
  password: {
    type: String,
    required: true,
    maxlength: 64
  },
  notes: [NoteSchema]
});

module.exports = mongoose.model('User', UserSchema);