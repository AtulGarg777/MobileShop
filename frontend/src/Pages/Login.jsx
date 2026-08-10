import { useForm } from "react-hook-form"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const loginSchema = object().shape({
    email: string().required("Email is required").email("Invalid email address"),
    password: string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export default function Login() {
    const { formState: { errors }, register, handleSubmit, watch } = useForm({ resolver: yupResolver(loginSchema) });
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');
    let [userData, setUserData] = useState({});


    useEffect(() => {
        try {
            //change this with jwt verification
            if (localStorage.getItem('token') && localStorage.getItem('userId')) {
                setUserData({
                    token: localStorage.getItem('token'),
                    _id: localStorage.getItem('userId')
                })
                navigate('/home')

            }


        }
        catch (err) {
            console.log(err);
        }
    }, [])

    async function submitForm(data) {

        //cretae jwt verification later
        if (Object.keys(userData).length) {
            data = userData;
        }

        setLoading(true);
        let baseUrl = import.meta.env.VITE_API_URL;
        let response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json();
        if (result.success) {
            localStorage.setItem("token", result.jwtToken);
            localStorage.setItem('username', result.user);
            localStorage.setItem('userId', result._id);
            navigate('/home');
        } else {
            console.log(result);

            setError('Password or Email May Be Wrong! try again');
            setTimeout(() => {
                navigate('/auth/login');
            }, 1000);
        }
    }

    function forgotPass() {
        navigate('/changePass')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">

                <h1 className="text-2xl font-bold text-gray-800 mb-1">Login</h1>
                <p className="text-sm text-gray-500 mb-6">Welcome back! Please sign in.</p>

                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                        {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                    </div>

                    <a onClick={forgotPass}><small className="text-blue-500 underline">Forgot Password</small></a>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition mt-1"
                    >
                        {error ? 'Login' : loading ? "Loading..." : "Login"}
                        {/* {error} */}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link to="/auth/signup" className="text-blue-600 hover:underline font-medium">
                            Create Account
                        </Link>
                    </p>
                    <span className="text-red-500">{error}</span>
                </form>
            </div>
        </div>
    )
}
