const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: Date,
  retailerId: String,
  invoiceNo: String,
  brandId: String,
  itemId: String,
  qty: Number,
  rate: Number,
  amount: Number
});

module.exports = mongoose.model('Sale', saleSchema);
