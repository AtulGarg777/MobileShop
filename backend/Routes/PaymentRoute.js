const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { productModel } = require('../models/Product');


router.post('/order', async (req, res) => {
    try {
        let instance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        })

        let { _id } = req.body;

        let product = await productModel.findOne({ _id });

        if (!product) {
            return res.json({ message: 'error in finding product', success: false })
        }

        let options = {
            amount: product.price * 100,
            currency: product.currency,
            receipt: "reciept_order"
        }

        const order = await instance.orders.create(options).then((ress) => {
            return res.status(200).json({ message: "order created Successfully", success: true, order: ress })
        }).catch((err) => {
            return res.status(err.statusCode).json({ message: "error occured in creating order", err, success: false })
        }
        )


    } catch (err) {
        res.status(500).json({ err, message: 'server error in creating order', success: false })
    }
})


router.post('/verify', (req, res) => {
    let paymentResponse = req.body;

    let generate_sign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex')

    if (generate_sign == razorpay_signature) {
        res.json({ message: "payment verified successfully", success: true })
    }

    res.json({ message: 'payment verification failed', success: false })

})


module.exports = router;




// async function payNow() {
//     const amount = document.getElementById('amount').value;

//     // Create order by calling the server endpoint
//     const response = await fetch('/create-order', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
//     });

//     const order = await response.json();

//     // Open Razorpay Checkout
//     const options = {
//         key: 'YOUR_KEY_ID', // Replace with your Razorpay key_id
//         amount: '50000', // Amount is in currency subunits.
//         currency: 'INR',
//         name: 'Acme Corp',
//         description: 'Test Transaction',
//         order_id: 'order_IluGWxBm9U8zJ8', // This is the order_id created in the backend
//         callback_url: 'http://localhost:3000/payment-success', // Your success URL
//         prefill: {
//             name: 'Gaurav Kumar',
//             email: 'gaurav.kumar@example.com',
//             contact: '9999999999'
//         },
//         theme: {
//             color: '#F37254'
//         },
//     };

//     const rzp = new r(options);
//     rzp.open();
// }