import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('email');
    return token ? children : <Navigate to="/auth/login" replace />;
}
