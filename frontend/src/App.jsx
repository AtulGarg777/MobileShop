import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import PrivateRoute from "./components/PrivateRoute"
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Cart from "./Pages/Cart"
import ProductDetail from "./Pages/ProductDetail"
import HandleLogRoutes from "./HandleLogRoutes"

function App() {
  return (
    <BrowserRouter>
      <HandleLogRoutes />

      <Routes>
        {/* <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>}></Route> */}
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute> <Cart /> </PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute> <ProductDetail /> </PrivateRoute>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App








// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// export default function Cart() {
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [removing, setRemoving] = useState(null);
//     const navigate = useNavigate();
//     const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');
//     const userId = localStorage.getItem("userId");
//     useEffect(() => {
//         let userEmail = localStorage.getItem("email");
//         let baseUrl = import.meta.env.VITE_API_URL;
//         let cartProduct = fetch(`${baseUrl.replace(/\/+$/, '')}/api/products/cart?email=${userEmail}`, { method: 'GET' }).then((r) => r.json()).then((res) => {
//             if (res.success) {
//                 console.log(res);
//         fetchCart();
//     }, []);
//     async function fetchCart() {
//         try {
//             setLoading(true);
//             const res = await fetch(`${baseUrl}/api/user/getcart?userId=${userId}`);
//             const data = await res.json();
//             if (data.success) {
//                 setCartItems(data.data);
//             }
//         })
//     }, [])
//         } catch (err) {
//             console.error("Failed to fetch cart:", err);
//         } finally {
//             setLoading(false);
//         }
//     }
//     async function removeFromCart(productId) {
//         setRemoving(productId);
//         try {
//             const res = await fetch(`${baseUrl}/api/user/removefromcart`, {
//                 method: "DELETE",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ productId, userId }),
//             });
//             const data = await res.json();
//             if (data.success) {
//                 setCartItems(prev => prev.filter(item => item._id !== productId));
//             }
//         } catch (err) {
//             console.error("Failed to remove item:", err);
//         } finally {
//             setRemoving(null);
//         }
//     }
//     const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
//     const totalSavings = cartItems.reduce((sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0);
//     return (
//         <>
//             <div>cart page</div>
//         </>
//     )
//         <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1740] to-[#24243e]">
//             <Navbar />
//             <div className="max-w-6xl mx-auto px-4 py-10">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h2 className="text-3xl font-extrabold text-white mb-1">
//                         Your Cart
//                         {!loading && cartItems.length > 0 && (
//                             <span className="ml-3 text-lg font-semibold text-indigo-400">
//                                 ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
//                             </span>
//                         )}
//                     </h2>
//                     <p className="text-slate-500 text-sm">Review your selected products before checkout</p>
//                 </div>
//                 {/* Loading State */}
//                 {loading && (
//                     <div className="flex flex-col items-center justify-center py-32 gap-4">
//                         <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
//                         <p className="text-slate-400 text-sm">Loading your cart...</p>
//                     </div>
//                 )}
//                 {/* Empty State */}
//                 {!loading && cartItems.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-28 gap-5">
//                         <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                         </div>
//                         <div className="text-center">
//                             <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
//                             <p className="text-slate-500 text-sm mb-6">Looks like you haven't added anything yet.</p>
//                             <button
//                                 onClick={() => navigate('/')}
//                                 className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200"
//                             >
//                                 Browse Products
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {/* Cart Content */}
//                 {!loading && cartItems.length > 0 && (
//                     <div className="flex flex-col lg:flex-row gap-8">
//                         {/* Cart Items List */}
//                         <div className="flex-1 flex flex-col gap-4">
//                             {cartItems.map((item) => {
//                                 const stars = [1, 2, 3, 4, 5].map(s => (
//                                     <span key={s} className={s <= Math.round(item.rating) ? 'text-yellow-400 text-xs' : 'text-slate-700 text-xs'}>★</span>
//                                 ));
//                                 return (
//                                     <div
//                                         key={item._id}
//                                         className="relative flex gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 hover:border-indigo-500/30 hover:shadow-[0_8px_32px_rgba(99,102,241,0.1)] transition-all duration-300"
//                                     >
//                                         {/* Product Image */}
//                                         <div
//                                             className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#13131f] flex items-center justify-center cursor-pointer"
//                                             onClick={() => navigate(`/products/${item._id}`, { state: { data: item } })}
//                                         >
//                                             <img
//                                                 src={item.mainImage}
//                                                 alt={item.name}
//                                                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                                             />
//                                         </div>
//                                         {/* Product Details */}
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-[0.65rem] font-bold uppercase tracking-widest text-indigo-400 mb-0.5">{item.brand}</p>
//                                             <h3
//                                                 className="text-sm font-semibold text-slate-100 mb-2 line-clamp-2 leading-snug cursor-pointer hover:text-indigo-300 transition-colors"
//                                                 onClick={() => navigate(`/products/${item._id}`, { state: { data: item } })}
//                                             >
//                                                 {item.name}
//                                             </h3>
//                                             {/* Feature Tags */}
//                                             <div className="flex flex-wrap gap-1 mb-2">
//                                                 {item.features?.ram && (
//                                                     <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">{item.features.ram}</span>
//                                                 )}
//                                                 {item.features?.storage && (
//                                                     <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">{item.features.storage}</span>
//                                                 )}
//                                                 {item.features?.display && (
//                                                     <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">{item.features.display}</span>
//                                                 )}
//                                             </div>
//                                             {/* Rating */}
//                                             {item.rating && (
//                                                 <div className="flex items-center gap-1 mb-2">
//                                                     {stars}
//                                                     <span className="text-xs text-slate-400 ml-1">{item.rating}</span>
//                                                     {item.reviewCount && (
//                                                         <span className="text-[0.65rem] text-slate-600">({item.reviewCount} reviews)</span>
//                                                     )}
//                                                 </div>
//                                             )}
//                                             {/* Price Row */}
//                                             <div className="flex items-center justify-between gap-2 flex-wrap mt-auto">
//                                                 <div className="flex items-baseline gap-2">
//                                                     <span className="text-lg font-bold text-cyan-300">
//                                                         ₹{item.price?.toLocaleString('en-IN')}
//                                                     </span>
//                                                     {item.originalPrice && item.originalPrice > item.price && (
//                                                         <>
//                                                             <span className="text-xs text-slate-500 line-through">
//                                                                 ₹{item.originalPrice?.toLocaleString('en-IN')}
//                                                             </span>
//                                                             <span className="text-[0.65rem] font-semibold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
//                                                                 {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
//                                                             </span>
//                                                         </>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {/* Remove Button */}
//                                         <button
//                                             onClick={() => removeFromCart(item._id)}
//                                             disabled={removing === item._id}
//                                             title="Remove from cart"
//                                             className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             {removing === item._id ? (
//                                                 <div className="w-3.5 h-3.5 border-2 border-red-400/40 border-t-red-400 rounded-full animate-spin" />
//                                             ) : (
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                                 </svg>
//                                             )}
//                                         </button>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                         {/* Order Summary Sidebar */}
//                         <div className="lg:w-80 flex-shrink-0">
//                             <div className="sticky top-6 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
//                                 <h3 className="text-lg font-bold text-white mb-5">Order Summary</h3>
//                                 <div className="space-y-3 mb-5">
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-slate-400">Subtotal ({cartItems.length} items)</span>
//                                         <span className="text-slate-200 font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
//                                     </div>
//                                     {totalSavings > 0 && (
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-slate-400">Discount</span>
//                                             <span className="text-green-400 font-medium">−₹{totalSavings.toLocaleString('en-IN')}</span>
//                                         </div>
//                                     )}
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-slate-400">Delivery</span>
//                                         <span className="text-green-400 font-medium">FREE</span>
//                                     </div>
//                                 </div>
//                                 <div className="border-t border-white/10 pt-4 mb-5">
//                                     <div className="flex justify-between">
//                                         <span className="text-white font-bold">Total</span>
//                                         <span className="text-cyan-300 font-extrabold text-xl">
//                                             ₹{totalPrice.toLocaleString('en-IN')}
//                                         </span>
//                                     </div>
//                                     {totalSavings > 0 && (
//                                         <p className="text-green-400 text-xs mt-1 text-right">
//                                             You save ₹{totalSavings.toLocaleString('en-IN')} 🎉
//                                         </p>
//                                     )}
//                                 </div>
//                                 <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)] active:scale-[0.98]">
//                                     Proceed to Checkout
//                                 </button>
//                                 <button
//                                     onClick={() => navigate('/')}
//                                     className="w-full mt-3 text-slate-400 hover:text-white text-sm font-medium py-2 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
//                                 >
//                                     ← Continue Shopping
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
// }
