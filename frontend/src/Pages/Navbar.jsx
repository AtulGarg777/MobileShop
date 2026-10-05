import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import MobileNavbar from './MobileNavbar.jsx';
import DesktopNavbar from '../Pages/DesktopNavbar.jsx'

export default function Navbar() {

    let navigate = useNavigate();
    // let [desktopView, setDesktopView] = useState(true);

    return (
        <>
            <MobileNavbar />
            <DesktopNavbar />


            {/* <div>
                <p> {userName ? `Hi, ${userName?.substring(0, userName?.indexOf(" "))} ` : ''} &nbsp; &nbsp;</p>
            </div> */}
        </>
    )
}