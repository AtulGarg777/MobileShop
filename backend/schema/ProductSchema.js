const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    description: { type: String },
    mainImage: { type: String },
    images: [String],
    features: {
        processor: String,
        ram: String,
        storage: String,
        display: String,
        battery: String,
        operatingSystem: String,
        connectivity: [String],
        biometrics: String
    },
    colors: [String],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = { productSchema };
