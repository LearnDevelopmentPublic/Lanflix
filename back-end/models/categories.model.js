var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    unique: true,
    required: true
  },
  description: string
});

var Categories = module.exports = mongoose.model('Categories', categoriesSchema);
