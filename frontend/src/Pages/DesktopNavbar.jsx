import { useNavigate } from 'react-router-dom'
import '../css/navbar.css'
import { useEffect, useState } from 'react';

export default function Navbar() {
    let navigate = useNavigate();

    let [userName, setUsername] = useState(undefined);


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

            <div className="navbar desktop_view">
                <div className='logo'><a href="/">LOGO</a></div>
                <div className='nav_search'>
                    <input type="text" placeholder="Search" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className='nav_links'>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Products</a></li>
                        <li><a href="">Categories</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </div>
                <div className='nav_btns'>
                    <div>
                        <button type="button" className='navBtn'><i className="fa-regular fa-moon "></i></button>
                        <button type="button" className='navBtn' onClick={() => navigate('/cart')}><i className="fa-solid fa-cart-plus" ></i></button>
                    </div>
                    {userName ? <>
                        <button type='submit' className='authBtn'
                            onClick={logOut}>
                            LogOut
                        </button>
                    </> :
                        <div>
                            <button type="button" style={{ cursor: 'pointer' }} className='authBtn' onClick={logIn}>Login</button>
                            <button type="button" style={{ cursor: 'pointer' }} className='authBtn' onClick={signUp}>Signup</button>
                        </div>
                    }
                </div>
            </div>


            {/* <div>
                <p> {userName ? `Hi, ${userName?.substring(0, userName?.indexOf(" "))} ` : ''} &nbsp; &nbsp;</p>
            </div> */}
        </>
    )
}