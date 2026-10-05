import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/mobileBar.css'

export default function MobileNavbar() {
    const navigate = useNavigate();
    const [userName, setUsername] = useState(undefined);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        let userName = localStorage.getItem('user');
        if (userName) {
            setUsername(userName)
        }
    }, [])

    function logIn() {
        navigate('/auth/login')
    }
    function signUp() {
        navigate('/auth/signup')
    }

    // this is not complete and correct
    function logOut() {
        //implement proper logout functionality
        localStorage.removeItem('user');
        setUsername(undefined);
    }
    return (
        <>
            <div className="navbar mobile_view">
                <div className='logo'>LOGO</div>
                <div className='nav_search'>
                    <input type="text" placeholder="Search" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <div className='nav_btns'>
                    <div>
                        <button type="button" className='navBtn' onClick={() => navigate('/cart')}><i className="fa-solid fa-cart-plus" ></i></button>
                    </div>


                    <div className='links_bar'>
                        <div><i className="fa-solid fa-bars" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer' }}></i>
                            <div className={`nav_links ${isMenuOpen ? 'open' : ''}`}>
                                <ul>
                                    <li><a href="">Home</a></li>
                                    <li><a href="">Products</a></li>
                                    <li><a href="">Categories</a></li>
                                    <li><a href="">About</a></li>
                                    <li><a href="">Contact</a></li>
                                    <button type="button" className='navBtn'><i className="fa-regular fa-moon "></i></button>
                                    {userName ? <>
                                        <button type='submit' className='authBtn'
                                            onClick={logOut}>
                                            LogOut
                                        </button>
                                    </> :
                                        <>
                                            <button type="button" className='authBtn' onClick={logIn}>Login</button>
                                            <button type="button" className='authBtn' onClick={signUp}>Signup</button>
                                        </>
                                    }

                                </ul>

                            </div></div>

                    </div>


                </div>
            </div>
        </>
    )
}