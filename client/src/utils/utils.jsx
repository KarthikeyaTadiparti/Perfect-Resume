import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        postion: "top-right",
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        postion: "top-right",
    });
};

export const cn = (...inputs) => {
    return twMerge(inputs);
};
