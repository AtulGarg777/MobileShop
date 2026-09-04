// Dynamically loads the Razorpay checkout script only when needed.
// Resolves immediately if already loaded (idempotent).
function loadRazorpay() {
    return new Promise((resolve, reject) => {
        // Already loaded — don't inject again
        if (window.Razorpay) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
    });
}

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
        const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/payment/order`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        });

        const res = await response.json();

        if (!res.success) {
            console.error("Order creation failed:", res.message);
            return;
        }

        // Load Razorpay script on-demand (only once — idempotent)
        await loadRazorpay();

        let options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: res.order.amount,
            currency: res.order.currency,
            name: 'GMS Led Hub',
            description: "testing_razorpay",
            order_id: res.order.id,
            prefill: {
                name: 'Gaurav Kumar',
                email: 'gaurav.kumar@example.com',
                contact: '7973033054'
            },
            theme: {
                color: '#F37254'
            },
            handler: function (paymentResponse) {
                fetch(`${baseUrl.replace(/\/+$/, "")}/api/payment/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(paymentResponse)
                })
                    .then((r) => r.json())
                    .then((verifyRes) => {
                        if (verifyRes.success) {
                            window.location.href = '/verify';
                        } else {
                            console.error("Payment verification failed", verifyRes);
                        }
                    })
                    .catch((err) => console.error("Verify error:", err));
            },
            modal: {
                ondismiss: function () {
                    console.log("Razorpay modal closed by user.");
                }
            }
        };

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', function (response) {
            console.error("Payment failed:", response.error);
            // show an error message to the user
        });

        rzp.open();

    } catch (err) {
        console.error("Error in Buy Product Button IN Payment file", err);
    }
}

export { cardClick, buyNow };