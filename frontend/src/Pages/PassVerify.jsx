import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { toastSuccess } from "../Util/toastify";

export default function PassVerify() {

    const [params] = useSearchParams();
    let Token = params.get('token');
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/user/verifyPassword?token=${Token}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.success) {
                    toastSuccess('Verified Successfully');
                    navigate('/auth/login');
                } else {
                    console.log(res?.message);
                }
            }).catch((err) => {
                console.log("Error Occcured in Frontend During Verifying", err);
            })
    }, []);
    return (
        <>
            <div className="m-auto">
                Verifying Password...
            </div>
        </>
    )
}