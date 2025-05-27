const Sale = require('../models/Sale');

exports.addSale = async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.status(201).json({ message: "Sale recorded" });
};
