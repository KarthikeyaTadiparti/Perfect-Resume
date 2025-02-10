import React from "react";
import Template1 from "./template1";
import { cn } from "@/utils/utils";

function Preview({ formData, selectedTemplate, className, scaleFactor = 1 }) {
    return (
        <div
            className={cn(
                "w-[595px] min-h-[842px] bg-white border-none shadow-none print:w-full print:h-full",
                className
            )}
            style={{
                transform: `scale(${scaleFactor})`,
                transformOrigin: "top left",
            }}
        >
            <div id="pdf-content" className="w-full h-full p-8">
                {selectedTemplate === "template1" ? (
                    <Template1 formData={formData} />
                ) : (
                    <div>
                        <h2 className="text-lg font-semibold">Template 2</h2>
                        <p>
                            {formData.firstName} {formData.lastName}
                        </p>
                        <p>Email: {formData.email}</p>
                        <p>Mobile: {formData.mobile}</p>
                        <p>
                            Location: {formData.city}, {formData.state}
                        </p>
                        <p>
                            <strong>Objective:</strong>
                        </p>
                        <p>{formData.objective}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Preview;
