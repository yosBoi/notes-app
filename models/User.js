const mongoose = require('mongoose');
//const Note = require('./Note');

const NoteSchema = new mongoose.Schema({
  title:{
    type: String,
    max:12
  },
  content:{
    type: String,
    required: true,
  },
  color: {
    type: String,
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 24
  },
  password: {
    type: String,
    required: true
  },
  notes: [NoteSchema]
});

module.exports = mongoose.model('User', UserSchema);