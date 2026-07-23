// const { useLocation, useNavigate } = require("react-router-dom");
import { useLocation, useNavigate } from "react-router-dom";

export default function HandleLogRoutes() {

    const location = useLocation();
    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
        if (location.pathname == '/' || location.pathname == '/auth/login', location.pathname == '/auth/signup') {
            navigate('/home');
        }
    }
}