import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import userSchema from '../utils/formValidation';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });
    const navigate = useNavigate();

    async function submitForm(data) {
        console.log("aifg");
        console.log(import.meta.env.VITE_API_URL);

        let baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/api/auth / signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await response.json();
        console.log(result);

        if (result.success) {
            navigate('/auth/login');
        } else {
            console.error("Signup failed:", result.message);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">

                <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
                <p className="text-sm text-gray-500 mb-6">Fill in the details to get started.</p>

                <form method="POST" onSubmit={handleSubmit(submitForm)} noValidate className="flex flex-col gap-4">

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name')}
                            placeholder="Enter your name"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="email@example.com"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="mobNo" className="text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            id="mobNo"
                            type="text"
                            inputMode="numeric"
                            {...register('mobNo')}
                            placeholder="Enter mobile number"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                        {errors.mobNo && <span className="text-xs text-red-500">{errors.mobNo.message}</span>}
                    </div>

                    {/* Password */}
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
                    {/* <div>
                    <label htmlFor="passwordAgain">Re Enter Password</label> <br />
                    <input id='passwordAgain' type="password" {...register('passwordAgain', { required: "Enter Password", validate: (value) => value === watch('password') || 'Password do not match' })} placeholder="Re Enter the password" />
                    {errors.passwordAgain && <span>{errors.passwordAgain.message}</span>}

                </div> */}
                    {/* <div>
                    <label htmlFor="state">State</label> <br />
                    <input id='state' type="text" {...register('address.state')} placeholder="Enter Your State" />
                    {errors.address?.state && <span>{errors.address?.state.message}</span>}

                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode</label>
                        <input
                            id="pincode"
                            type="text"
                            inputMode="numeric"
                            {...register('address.pincode')}
                            placeholder="Enter your pincode"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                        {errors.address?.pincode && <span className="text-xs text-red-500">{errors.address?.pincode.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="addressLine" className="text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            id="addressLine"
                            type="text"
                            {...register('address.addressLine')}
                            placeholder="Enter your address"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        ></textarea>
                        {errors.address?.addressLine && <span className="text-xs text-red-500">{errors.address?.addressLine.message}</span>}
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition mt-1">Sign Up</button>

                </form>
                <br />
                <p className="text-center text-sm text-gray-500">
                    Already Registered{"  "}
                    <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}