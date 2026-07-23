const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    mobNo: { type: String, default: null },
    address: {
        city: { type: String },
        pincode: { type: Number },
        cityState: { type: String },
        addressLine: { type: String }
    },
    cart: [{ type: String, unique: true, trim: true }]
}, { timestamps: true });

module.exports = { userSchema };




// 6. Add a isVerified / isActive field
// For email verification or account activation flows, a boolean field like isVerified: false by default is commonly needed.

// 7. Add refreshToken field
// If you plan to use JWT refresh tokens, storing the refresh token in the user document is a common pattern in advanced auth services.

// 8. Add pincode validation
// pincode is currently just Number. You could add min and max validators to enforce valid pincode ranges (e.g. Indian pincodes are 6 digits: 100000–999999).