import { uiActions } from "./ui-slice";

export const showNotification = (notification) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification(notification));

        if (notification.hide)
            setTimeout(() => dispatch(uiActions.hideNotification()), 1500);
    };
};

export const hideNotification = (notification) => {
    return async (dispatch) => {
        dispatch(uiActions.hideNotification());
    };
};
