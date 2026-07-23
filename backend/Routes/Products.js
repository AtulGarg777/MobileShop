const mongoose = require('mongoose');
const { productModel } = require('../models/Product');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let data = await productModel.findById(id);
        res.status(200).json({ data, success: true });
        console.log(data + " data");
    } catch (err) {
        res.status(500).json({ message: 'failed to get product data', succes: false, err })
    }

    // try {
    //     console.log("getting data");

    //     const { brand, minPrice, maxPrice } = req.query;
    //     let query = {};

    //     if (brand) query.brand = brand;
    //     if (minPrice || maxPrice) {
    //         query.price = {};
    //         if (minPrice) query.price.$gte = Number(minPrice);
    //         if (maxPrice) query.price.$lte = Number(maxPrice);
    //     }
    //     if (Object.keys(query).length === 0) {
    //         query.brand = ""
    //     }

    //     console.log(query);

    //     let data = await productModel.find(query);
    //     res.status(200).json({ success: true, data });
    // }
    // catch (err) {
    //     res.status(500).json({ success: false, message: "failed to fetch products", err })
    // }
})

router.get('/cart', async (req, res) => {
    let { email } = req.query;
    let user = await productModel.findOne({ email });

})

module.exports = router;