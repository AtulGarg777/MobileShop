const { userModel } = require('../models/UserModel');
const { productModel } = require('../models/Product');
const express = require('express');
const router = express.Router();

router.post('/addtocart', async (req, res) => {
    try {
        let { productId, userId } = req.body;
        console.log(productId);
        console.log(userId);

        let user = await userModel.findByIdAndUpdate(userId)

        if (!user) {
            return res.status(401).json({ message: 'you need to login', success: false });
        } else if (user.cart.includes(productId)) {
            return res.status(400).json({ message: 'Product Already exist', success: false });
        } else {
            user.cart.push(productId);
            user.save();
        }

        return res.status(200).json({ message: "Item Added to Cart", success: true })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't add item in cart", success: false, error });
    }
})

router.get('/getProducts/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let user = await userModel.findById(id);
        let cartItemsIds = user.cart;
        let data = await productModel.find({ _id: { $in: cartItemsIds } })
        return res.status(200).json({ data, success: true, message: "cart items fetched successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "error occured during getting cart items" });

    }
})

module.exports = router