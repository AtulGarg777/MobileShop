import { useEffect } from "react"

export default function Cart() {

    useEffect(() => {
        let userEmail = localStorage.getItem("email");
        let baseUrl = import.meta.env.VITE_API_URL;
        let cartProduct = fetch(`${baseUrl.replace(/\/+$/, '')}/api/products/cart?email=${userEmail}`, { method: 'GET' }).then((r) => r.json()).then((res) => {
            if (res.success) {
                console.log(res);
            }
        })
    }, [])
    return (
        <>
            <div>cart page</div>
        </>
    )
}