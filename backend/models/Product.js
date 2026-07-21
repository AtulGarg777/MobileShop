const mongoose = require('mongoose');
const { productSchema } = require('../schema/ProductSchema');

const productModel = mongoose.model('product', productSchema);



module.exports = { productModel };
