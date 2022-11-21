import { showNotification } from "./ui-actions";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://react-train-swapi-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
            );

            if (!response.ok) {
                throw new Error("Could not fetch cart data!");
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                    changed: false,
                })
            );
        } catch (error) {
            dispatch(
                showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Fetching cart data failed!",
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://react-train-swapi-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        };

        try {
            await sendRequest();
            dispatch(
                showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                    hide: true,
                })
            );
        } catch (error) {
            dispatch(
                showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );
        }
    };
};
