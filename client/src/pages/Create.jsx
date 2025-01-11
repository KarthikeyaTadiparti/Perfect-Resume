import React, { useState } from "react";
import Edit from "../components/Edit";
import Preview from "../components/Preview";

function Create() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        state: "",
        city: "",
        objective: "",
    });

    const [selectedTemplate, setSelectedTemplate] = useState("template1");

    return (
        <div className="w-4/5 flex flex-col gap-10 my-10 mx-auto">
            <div className="w-full flex justify-center gap-4">
                <button
                    className={`px-4 py-2 border rounded ${
                        selectedTemplate === "template1"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedTemplate("template1")}
                >
                    Template 1
                </button>
                <button
                    className={`px-4 py-2 border rounded ${
                        selectedTemplate === "template2"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedTemplate("template2")}
                >
                    Template 2
                </button>
            </div>

            <div className="w-full flex gap-10">
                <div className="w-1/2">
                    <Edit formData={formData} setFormData={setFormData} />
                </div>
                <div className="w-1/2">
                    <Preview
                        formData={formData}
                        selectedTemplate={selectedTemplate}
                    />
                </div>
            </div>
        </div>
    );
}

export default Create;
