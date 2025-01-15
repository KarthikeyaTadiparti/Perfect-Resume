import * as React from "react";

const Input = React.forwardRef(
    (
        { labelName, placeholder = `Enter ${labelName}`, type, ...props },
        ref
    ) => {
        return (
            <div className="w-full max-w-sm min-w-[200px] mt-4">
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
