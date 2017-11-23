var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    unique: true,
    required: true
  },
  description: String
});

var Categories = module.exports = mongoose.model('Categories', categoriesSchema);
