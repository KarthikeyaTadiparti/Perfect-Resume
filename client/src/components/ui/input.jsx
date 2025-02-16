import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(
    (
        {
            labelName,
            placeholder = `Enter ${labelName}`,
            type,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn("w-full mt-4", className)}>
                <label
                    htmlFor={props.name}
                    className="block mb-2 text-sm text-slate-600"
                >
                    {labelName}
                </label>
                <input
                    type={type}
                    id={props.name}
                    placeholder={placeholder}
                    className="inputFields"
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
