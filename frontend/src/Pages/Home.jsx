import { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

const brands = ['All', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Sony', 'Asus', 'Vivo', 'Oppo', 'Realme', 'Huawei', 'Honor', 'Nokia']

const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹20K', min: 0, max: 20000 },
    { label: '₹20K - ₹50K', min: 20000, max: 50000 },
    { label: '₹50K - ₹1L', min: 50000, max: 100000 },
    { label: 'Above ₹1L', min: 100000, max: Infinity },
]

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [brand, setBrand] = useState('All')
    const [priceIdx, setPriceIdx] = useState(0)

    useEffect(() => {
        let baseUrl = import.meta.env.VITE_API_URL;
        fetch(`${baseUrl.replace(/\/+$/, "")}/products`)
            .then((r) => r.json())
            .then((res) => {
                if (res.success) setProducts(res.data)
                else setError('Failed to load products.')
            })
            .catch(() => setError('Could not connect to server.'))
            .finally(() => setLoading(false))
    }, [])

    const { min, max } = priceRanges[priceIdx]
    const filtered = products
        .filter(p => brand === 'All' || p.brand === brand)
        .filter(p => p.price >= min && p.price <= max)

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-200">

            <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-14 text-center border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),transparent_60%)] pointer-events-none" />
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                        Mobile Marketplace
                    </h1>
                    <p className="text-slate-400 text-base">Browse the latest phones from top brands</p>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto flex gap-5 p-5">

                <aside className="w-52 shrink-0 sticky top-5 self-start">
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">

                        <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400 mb-2">Brand</p>
                        <div className="flex flex-col gap-1 mb-5">
                            {brands.map(b => (
                                <button
                                    key={b}
                                    onClick={() => setBrand(b)}
                                    className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${brand === b ? 'bg-indigo-600/30 border border-indigo-500 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>

                        <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400 mb-2">Price</p>
                        <div className="flex flex-col gap-1">
                            {priceRanges.map((r, i) => (
                                <button
                                    key={r.label}
                                    onClick={() => setPriceIdx(i)}
                                    className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${priceIdx === i ? 'bg-indigo-600/30 border border-indigo-500 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {loading && <p className="text-slate-400 text-sm">Loading...</p>}

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
                        {!loading && filtered.map(p => <ProductCard key={p._id} product={p} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
