import { toastError, toastSuccess } from './toastify'



function addToCart(id) {
    let user = localStorage.getItem('userId');

    try {
        fetch(`${import.meta.env.VITE_API_URL}/api/user/addtocart`,
            {
                method: 'POST',
                body: JSON.stringify({
                    productId: id,
                    userId: user
                }),
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                return res.json()
            }).then(res => {
                if (res.success) {
                    toastSuccess(res.message);
                } else if (res.success === false) {
                    toastError(res.message);
                }
            })
    } catch (error) {
        console.error(error);
    }
}

function removeFromCart(id, e, dispatch, removeProduct) {
    e.stopPropagation();

    let user = localStorage.getItem('userId');
    fetch(`${import.meta.env.VITE_API_URL}/api/user/removefromcart`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: user,
            productId: id
        })
    }).then(res => res.json())
        .then((res) => {
            if (res.success == false) {
                console.log(res.err);
                toastError(res.err);
            } else {
                toastSuccess(res.message);
                dispatch(removeProduct(id));
            }
        }).catch((err) => {
            toastError("Something Went Wrong");
            console.log(err);
        })
}

export { addToCart, removeFromCart };