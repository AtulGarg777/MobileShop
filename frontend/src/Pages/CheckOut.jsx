import { useState } from 'react'
import '../css/checkout.css'

export default function CheckOut() {

    let [show, setShow] = useState(false);

    function cancelPurchase() {
        setShow(false);
    }

    // id is pending
    async function openPaymentScreen(_id) {
        try {
            let baseUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/payment/order`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id, email: localStorage.getItem('email') }),
                credentials: 'include'
            });

            const res = await response.json();

            if (!res.success) {
                console.log(res);

                toastError(res.message);
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


    return (
        <>
            {show ? <div className="checkout">
                < div>
                    Deliever to
                    < p > abc</p >
                    <p>street 151505 mansa punjab</p>
                </div >
                <div>
                    <h2>product price</h2>
                    <p>gst price</p>
                    <p>Amount to pay</p>
                    <button type="button" onClick={openPaymentScreen}>Continue</button>
                    <button type='button' onClick={cancelPurchase}>Cancel</button>
                </div>
            </div > : <></>
            }
        </>

    )
}