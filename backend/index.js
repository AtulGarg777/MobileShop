const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Auth_route = require('./Routes/Auth_route');
const cors = require('cors');
const { productModel } = require('./models/Product');
app.use(cors());
const Products = require('./Routes/Products')

app.use(express.json());

const PORT = process.env.VITE_PORT;

mongoose.connect(process.env.VITE_MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    })
}).then(() => {
    //all routes are here

}).catch((err) => {
    console.error("mongo db connection failed");
})

app.use('/api/auth', Auth_route);
app.use('/api/products', Products);

app.get('/', (req, res) => {
    res.send("home backend");
})

app.get('/products', async (req, res) => {
    try {
        const { brand, minPrice, maxPrice } = req.query;
        let query = {};

        if (brand) query.brand = brand;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        console.log(query);

        let data = await productModel.find(query);
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "failed to fetch products" })
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", success: false })
})











// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // Get all mobile phones (with optional filtering for Homepage UI)
// router.get('/mobiles', async (req, res) => {
//     try {
//         const { brand, featured, limit } = req.query;
//         let query = { category: 'Smartphones' };

//         if (brand) query.brand = brand;
//         if (featured) query.isFeatured = featured === 'true';

//         let products = Product.find(query);

//         if (limit) products = products.limit(parseInt(limit));

//         const result = await products;
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error Fetching Products", error: error.message });
//     }
// });

// module.exports = router;