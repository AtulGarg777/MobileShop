import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    let userName = localStorage.getItem('username');
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        navigate('/auth/login')
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-14 text-center border-b border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),transparent_60%)] pointer-events-none" />
            <div className='flex justify-between items-center'>
                <p className='text-white'>Hi, {userName.substring(0, userName.indexOf(" "))} &nbsp; &nbsp;</p>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => navigate('/cart')}
                        className='relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer border border-white/10'
                        title='Cart'
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                    <button className='bg-blue-600 px-4 py-1.5 text-slate-300 border-0 rounded-2xl cursor-pointer hover:bg-blue-700' type='submit' onClick={logOut}>Logout</button>
                </div>
            </div>
            <div className="relative">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
                    Mobile Marketplace
                </h1>
                <p className="text-slate-400 text-base">Browse the latest phones from top brands</p>
            </div>
        </div>
    )
}