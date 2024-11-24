const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  careerId: { type: String, required: true, unique: true },
  resume: { type: String, required: true },
});

module.exports = mongoose.model('Resume', resumeSchema);
