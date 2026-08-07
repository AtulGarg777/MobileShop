const { userModel } = require('../models/UserModel');
const { productModel } = require('../models/Product');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mailTransporter = require('../Utils/mailTransporter');
const crypto = require('crypto');


router.post('/verifyPassword', async (req, res) => {
    try {
        let { token } = req.query;

        let user = await userModel.findOne({ verificationToken: token, verificationTokenExpireAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Token! Try Again', success: false });
        }
        // console.log(user.tempPassword);

        user.password = user.tempPassword;
        user.tempPassword = undefined;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;
        // console.log(user.modifiedPaths());

        await user.save();

        res.status(200).json({ message: "Password Changed Successfully", success: true });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error during password changing', success: false })
    }
})

router.post('/changePass', async (req, res) => {

    try {
        let { newPassword, email } = req.body;

        if (!newPassword) {
            return res.json({ message: "Password Field is Empty", success: false });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User Not Found in DB', success: false });
        }

        let token = crypto.randomBytes(32).toString('hex');
        let newPass = await bcrypt.hash(newPassword, 10);
        user.tempPassword = newPass;
        // console.log("newPass ", newPass);

        user.verificationToken = token;
        user.verificationTokenExpireAt = Date.now() + 5 * 60 * 1000;
        await user.save();

        //later change to with user.email
        let baseUrl = process.env.FRONTEND_URL;
        mailTransporter({ verifyUrl: `${baseUrl.replace(/\/+$/, "")}passVerify?token=${token}`, text: "Password Changing" });

        res.status(200).json({ message: 'Check Email Sent to you', success: true });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error in sending email to user", success: false });
    }

})

router.post('/addtocart', async (req, res) => {
    try {
        let { productId, userId } = req.body;

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
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "can't add item in cart,", success: false, err });
    }
})

router.delete('/removefromcart', async (req, res) => {
    try {
        let { userId, productId } = req.body;
        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'User Not Found', success: false })
        }
        let itemInd = user.cart?.indexOf(productId);
        if (itemInd == -1) {
            return res.status(400).json({ message: 'Refresh page and Try Again ', success: false })
        }

        user.cart.splice(itemInd, 1);
        await user.save();

        return res.status(200).json({ message: 'Item removed from cart', success: true });

    } catch (err) {
        console.log(err);

        return res.status(500).json({ message: "error occured in /removefromcart", success: false, err })
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
        console.log(err);
        return res.status(500).json({ success: false, message: "error occured during getting cart items", err });

    }
})

module.exports = router