import React from "react";

function Input({value,labelName,name,handleChanges}) {
    return (
        <div class="w-full max-w-sm min-w-[200px] mt-4">
            <label for={name} class="block mb-2 text-sm text-slate-600">
                {labelName}
            </label>
            <input
                type="text"
                class="inputFields"
                value={value}
                name={name}
                id={name}
                onInput={handleChanges}
            />
        </div>
    );
}

export default Input;
