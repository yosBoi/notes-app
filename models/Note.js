const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title:{
    type: String,
    max:12
  },
  content:{
    type: String,
    required: true,
    min: 1
  },
  color: {
    type: String,
  }
});

module.exports = mongoose.model('Note', NoteSchema);