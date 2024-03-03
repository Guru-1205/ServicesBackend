const mongoose = require('mongoose');

const SMdetailsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
    unique: true
  },
  Contact: {
    type: String,
    required: true
  },
  Shift: {
    type: String,
    required: true
  },
  VDT: {
    type: String,
    required: true
  },
  VDN: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const SMdetails = mongoose.model('SMdetails', SMdetailsSchema);

module.exports = SMdetails;
