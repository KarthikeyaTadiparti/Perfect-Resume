import React from "react";
import Input from "./Input";

function Edit({ formData, setFormData }) {
    
    const handleChanges = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="p-5 border rounded-lg bg-white border-gray-200">
            <div className="flex gap-4">
                <Input
                    value={formData.firstName}
                    labelName="First Name"
                    name="firstName"
                    handleChanges={handleChanges}
                />
                <Input
                    value={formData.lastName}
                    labelName="Last Name"
                    name="lastName"
                    handleChanges={handleChanges}
                />
            </div>

            <div className="flex gap-4">
                <Input
                    value={formData.email}
                    labelName="Email"
                    name="email"
                    handleChanges={handleChanges}
                />
                <Input
                    value={formData.mobile}
                    labelName="Mobile Number"
                    name="mobile"
                    handleChanges={handleChanges}
                />
            </div>

            <div className="flex gap-4">
                <Input
                    value={formData.city}
                    labelName="City"
                    name="city"
                    handleChanges={handleChanges}
                />
                <Input
                    value={formData.state}
                    name="state"
                    labelName="State"
                    handleChanges={handleChanges}
                />
            </div>

            <label htmlFor="message" className="block my-2 text-sm text-slate-600">
                Your Objective
            </label>
            <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your objective here..."
                name="objective"
                value={formData.objective}
                onChange={handleChanges}
            ></textarea>
        </div>
    );
}

export default Edit;
