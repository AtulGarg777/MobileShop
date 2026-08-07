import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { object, string } from 'yup'
import { toastError } from "../Util/toastify";

const schema = object().shape({
    email: string().required("Email Required").email("Invalid Email"),
    newPass: string().required("Password is required").min(6),
    passAgain: string().required("Password is required Again").min(6),
})

export default function changePassword() {

    const { watch, handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [loading, setLoading] = useState(false);

    async function submitForm(data) {

        if (watch('newPass') !== watch('passAgain')) {
            toastError("password not matching")
            return;
        }
        setLoading(true);
        let baseUrl = import.meta.env.VITE_API_URL;
        await fetch(`${baseUrl.replace(/\/+$/, "")}/api/user/changePass`,
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword: data.newPass,
                    email: data.email
                })
            })
            .then(res => {
                console.log("hello");
                return res.json()
            })
            .then((res) => { console.log(res) })
            .catch((err) => console.log(err))
    }
    return (<>
        <form onSubmit={handleSubmit(submitForm)}>
            <input type="email" {...register('email')} placeholder="Email Address" />
            {errors.email && <span>Email is Required</span>}
            <input type="password" {...register('newPass')} placeholder="New Password" />
            {errors.newPass && <span>Password is Required</span>}
            <input type="password" {...register('passAgain')} placeholder="Password Again" />
            {errors.passAgain && <span>This is Required</span>}
            <button type="submit" className="cursor-pointer bg-blue-600 hover:bg-blue-700">{loading ? 'Loading...' : 'Change Password'}</button>
        </form>
    </>)
}