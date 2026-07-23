import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const ProductDetail = () => {

    let location = useLocation();
    const navigationData = location.state;
    if (!navigationData) {
        return (<div>Error Occured In Fetching Data! Try Again</div>)
    }

    let { name, brand, category, price, currency, description, mainImage, features, colors, rating, reviewCount, stock, isFeatured, _id } = navigationData.data;



    // Mock data based strictly on your schema for demonstration
    const product = {
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80"
        ],
    };

    const [activeImage, setActiveImage] = useState(mainImage);
    // const [activeColor, setActiveColor] = useState(colors[0]);

    // Format currency
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(price);


    function addToCart(id) {
        let user = localStorage.getItem('userId');

        try {
            fetch(`${import.meta.env.VITE_API_URL}/api/user/addtocart`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        productId: id,
                        userId: user
                    }),
                    headers: { "Content-Type": "application/json" }
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-950 text-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* left column: images */}
                    <div className="flex flex-col gap-6">
                        {/* main image */}
                        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-center justify-center overflow-hidden aspect-[4/5]">
                            <img
                                src={activeImage}
                                alt={name}
                                className="w-full h-full object-cover rounded-xl transition-opacity duration-300 hover:opacity-90"
                            />
                        </div>

                        {/* image gallery thumbnails */}
                        {product.images && product.images.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(img)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'border-gray-800 hover:border-gray-600'
                                            }`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* right column: product details */}
                    <div className="flex flex-col">

                        {/* brand, category & featured badge */}
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">
                                {brand}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400 text-sm">{category}</span>
                            {isFeatured && (
                                <span className="ml-auto bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    Featured
                                </span>
                            )}
                        </div>

                        {/* title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            {name}
                        </h1>

                        {/* ratings & reviews */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-yellow-500">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span className="ml-2 font-bold text-lg text-white">{rating}</span>
                            </div>
                            <span className="text-gray-500 hover:text-indigo-400 cursor-pointer transition-colors underline decoration-gray-700 underline-offset-4">
                                {reviewCount} Reviews
                            </span>
                        </div>

                        {/* price & stock */}
                        <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-800">
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                {formattedPrice}
                            </span>
                            {stock > 0 ? (
                                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md text-sm font-medium mb-1 border border-emerald-500/20">
                                    In Stock ({stock})
                                </span>
                            ) : (
                                <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-md text-sm font-medium mb-1 border border-red-500/20">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* description */}
                        <p className="text-gray-400 leading-relaxed mb-8">
                            {description}
                        </p>

                        {/* colors
                    {colors && colors.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wider">Select Color</h3>
                            <div className="flex flex-wrap gap-3">
                                {colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveColor(color)}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${activeColor === color
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )} */}

                        {/* detailed features grid */}
                        <div className="mb-10">
                            <h3 className="text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">Technical Specifications</h3>
                            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0 text-sm">

                                    {Object.entries(features).map(([key, value], index) => {
                                        // Format the key to be readable (e.g., operatingSystem -> Operating System)
                                        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                                        // Format value if it's an array (like connectivity)
                                        const formattedValue = Array.isArray(value) ? value.join(', ') : value;

                                        return (
                                            <div
                                                key={key}
                                                className={`flex flex-col p-4 ${index % 2 === 0 ? 'sm:border-r border-gray-800' : ''
                                                    } ${index < Object.keys(features).length - 2 ? 'border-b border-gray-800' : ''
                                                    } ${(index === Object.keys(features).length - 2 && Object.keys(features).length % 2 !== 0) ? 'border-b sm:border-b-0 border-gray-800' : ''}`}
                                            >
                                                <span className="text-gray-500 mb-1">{formattedKey}</span>
                                                <span className="font-medium text-gray-200">{formattedValue}</span>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>

                        {/* action buttons */}
                        <div className="flex gap-4">
                            <button
                                disabled={stock === 0}
                                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${stock > 0
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.6)] hover:-translate-y-1'
                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }`} onClick={() => addToCart(_id)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            {/* <button
                            className="px-6 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white transition-all duration-300 hover:-translate-y-1"
                            aria-label="Add to wishlist"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;