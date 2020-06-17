const mongoose = require('mongoose');
require('mongoose-type-email');

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
  email:{
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 24
  },
  password: {
    type: String,
    required: true,
    maxlength: 64
  },
  recoveryCode: {
    type: String,
    default: null
  },
  notes: [NoteSchema]
});

module.exports = mongoose.model('User', UserSchema);