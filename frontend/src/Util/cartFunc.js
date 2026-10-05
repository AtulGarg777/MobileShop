import { toastError, toastSuccess } from './toastify'



function addToCart(id) {
    let user = localStorage.getItem('userId');

    if (!user) {
        let cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        if (!cart.includes(id)) {
            cart.push(id);
            localStorage.setItem('guestCart', JSON.stringify(cart));
            toastSuccess('Item Added to Cart');
        } else {
            toastError('Product Already exist');
        }
        return;
    }

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

    if (!user) {
        let guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        guestCart = guestCart.filter(itemId => itemId !== id);
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        if (dispatch && removeProduct) {
            dispatch(removeProduct(id));
        }
        toastSuccess('Item removed from cart');
        return;
    }

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