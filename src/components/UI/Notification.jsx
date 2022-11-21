import classes from "./Notification.module.css";
import { useDispatch } from "react-redux";
import { hideNotification } from "./../../store/ui-actions";

const Notification = (props) => {
    const dispatch = useDispatch();
    let specialClasses = "";

    if (props.status === "error") {
        specialClasses = classes.error;
    }
    if (props.status === "success") {
        specialClasses = classes.success;
    }

    const hide = () => {
        dispatch(hideNotification());
    };

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
            <p onClick={hide} className={classes.close}>
                Close
            </p>
        </section>
    );
};

export default Notification;
