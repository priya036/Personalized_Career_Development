const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  careerId: { type: String, required: true, unique: true }, 
  skills: String, 
});

module.exports = mongoose.model('Skills', skillsSchema);
