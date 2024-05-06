import { alertMessage } from "./ToastAlert";

export const validatePassword = (password: any, toast: any) => {
    if (password.length < 8) {
        alertMessage(
            toast,
            "warning",
            "Password Alert",
            "Password must be 8 character long with number and alphabic words!"
        );
        return false;
    }
    if (!/\d/.test(password)) {
        alertMessage(
            toast,
            "warning",
            "Password Alert",
            "Password must atleast one numeric value!"
        );
        return false;
    }

    if (!/[a-zA-Z]/.test(password)) {
        alertMessage(
            toast,
            "warning",
            "Password Alert",
            "Password must atleast one alphabic value!"
        );
        return false;
    }
    return true;
};
