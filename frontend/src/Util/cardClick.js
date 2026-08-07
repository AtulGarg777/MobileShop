async function cardClick(id, navigate) {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`).then((r) => r.json()).then((res) => {
        if (res.success) {
            navigate(`/products/${id}`, { state: { data: res.data } })

        } else {
            console.error(res);

        }
    }).catch((err) => console.error(err));
}

async function buyNow(e, _id) {
    e.stopPropagation();
    try {
        let baseUrl = import.meta.env.VITE_API_URL;
        await fetch(`${baseUrl.replace(/\/+$/, "")}/api/payment/order`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        }).then((res) => res.json())
            .then((res) => {
                console.log(res);

                let options = {
                    key: import.meta.env.VITE_RAZORPAY_API_KEY,
                    amount: (res.order.amount * 100),
                    currency: res.order.currency,
                    name: 'GMS Led Hub',
                    description: "testing_razorpay",
                    order_id: res.order.id,
                    callback_url: `http://localhost:5173/verify`,
                    prefill: {
                        name: 'Gaurav Kumar',
                        email: 'gaurav.kumar@example.com',
                        contact: '7973033054'
                    },
                    theme: {
                        color: '#F37254'
                    },
                }

                const rzp = new window.Razorpay(options);
                rzp.open();
            })
            .catch((err) => console.log(err))
    } catch (err) { }
}

export { cardClick, buyNow };