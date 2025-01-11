import React from "react";

function Preview({ formData, selectedTemplate }) {
    return (
        <div className="h-[876px] w-[620px] bg-white border border-slate-300 shadow-md p-4">
            {selectedTemplate === "template1" ? (
                <div>
                    <h2 className="text-lg font-semibold">Template 1</h2>
                    <p><strong>First Name:</strong> {formData.firstName}</p>
                    <p><strong>Last Name:</strong> {formData.lastName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Mobile:</strong> {formData.mobile}</p>
                    <p><strong>City:</strong> {formData.city}</p>
                    <p><strong>State:</strong> {formData.state}</p>
                    <p><strong>Objective:</strong> {formData.objective}</p>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold">Template 2</h2>
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>Email: {formData.email}</p>
                    <p>Mobile: {formData.mobile}</p>
                    <p>Location: {formData.city}, {formData.state}</p>
                    <p><strong>Objective:</strong></p>
                    <p>{formData.objective}</p>
                </div>
            )}
        </div>
    );
}

export default Preview;
