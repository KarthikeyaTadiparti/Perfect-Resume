import React from "react";
import { cn } from "../utils/utils";

function FormButton({ name, className }) {
    return (
        <button
            type="submit"
            className={cn(
                "text-white mt-2 mb-6 bg-pri-blue hover:bg-dark-pri-blue focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm w-full py-3 text-center",
                className
            )}
        >
            {name}
        </button>
    );
}

export default FormButton;
