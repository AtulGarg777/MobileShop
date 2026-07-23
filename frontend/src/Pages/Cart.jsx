import { useEffect, useState } from "react"
import Navbar from "./Navbar";

export default function Cart() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        let userId = localStorage.getItem("userId");
        let baseUrl = import.meta.env.VITE_API_URL;
        fetch(`${baseUrl.replace(/\/+$/, '')}/api/user/getProducts/${userId}`,)
            .then((r) => r.json())
            .then((res) => {
                if (res.success) {
                    setProducts(res.data);
                } else {
                    console.error(res);
                }
            })
    }, [])
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 bg-slate-800 py-7 px-3 h-screen">
                {products.length > 0 ? products.map((item, ind) => {
                    const { name, brand, price, mainImage, rating, reviewCount, stock, features, _id } = item;
                    return (

                        <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-[0_16px_40px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-pointer h-fit" key={_id}>
                            {stock === 0 && (
                                <span className="absolute bottom-3 left-3 z-10 text-[0.6rem] font-bold uppercase px-2 py-1 rounded bg-red-500/80 text-white">
                                    Out of Stock
                                </span>
                            )}

                            <div className="h-44 bg-[#13131f] flex items-center justify-center overflow-hidden">
                                <img src={mainImage} alt={name} loading="lazy" className="h-full w-full object-cover" />
                            </div>

                            <div className="p-4">
                                <p className="text-[0.68rem] font-bold uppercase tracking-widest text-indigo-400 mb-1">{brand}</p>
                                <h3 className="text-sm font-semibold text-slate-100 mb-2 line-clamp-2 leading-snug">{name}</h3>

                                <div className="flex flex-wrap gap-1 mb-2">
                                    {features?.ram && <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">{features.ram}</span>}
                                    {features?.storage && <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">{features?.storage}</span>}
                                    {features?.display && <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">{features?.display}</span>}
                                </div>

                                {/* <div className="flex items-center gap-1 mb-1">{stars} <span className="text-xs text-slate-400 ml-1">{rating}</span></div> */}
                                <p className="text-[0.68rem] text-slate-500 mb-3">{reviewCount} reviews</p>

                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <span className="text-base font-bold text-cyan-300" style={{ width: "-webkit-fill-available" }}>₹{price?.toLocaleString('en-IN')}</span>
                                    <button
                                        disabled={stock === 0}
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${stock === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                                    >
                                        {stock === 0 ? 'Sold Out' : 'Buy Now'}
                                    </button>
                                </div>
                            </div>
                        </div>)
                }) : <div>Your Cart Is Empty</div>}
            </div>
        </>
    )
}