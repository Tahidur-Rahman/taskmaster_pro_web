import { alertMessage } from "../utils/ToastAlert";

export const fbErrorDetect = (toast: any, errorCode: any) => {
    if (errorCode === "auth/email-already-in-use") {
        return alertMessage(
            toast,
            "warning",
            "SIGNIN ERROR!",
            "email-already-in-use"
        );
    }
    if (errorCode === "auth/invalid-password") {
        return alertMessage(
            toast,
            "warning",
            "SIGNIN ERROR!",
            "invalid-password"
        );
    }
    if (errorCode === "auth/invalid-email") {
        return alertMessage(toast, "warning", "SIGNIN ERROR!", "invalid-email");
    }
    if (errorCode === "auth/invalid-credential") {
        return alertMessage(
            toast,
            "warning",
            "SIGNIN ERROR!",
            "invalid-credential"
        );
    }
    if (errorCode === "auth/too-many-requests") {
        return alertMessage(
            toast,
            "warning",
            "SIGNIN ERROR!",
            "too-many-requests"
        );
    }
    return alertMessage(
        toast,
        "warning",
        "SIGNIN ERROR!",
        "Something Went Wrong"
    );
};
