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
