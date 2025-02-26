import React from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import { cn } from "@/lib/utils";

function Preview({ formData, className, scaleFactor = 1 }) {
    const renderTemplate = () => {
        switch (formData.template) {
            case "1":
                return <Template1 formData={formData} />;
            case "2":
                return <Template2 formData={formData} />;
            case "3":
                return <Template3 formData={formData} />;
            case "4":
                return <Template4 formData={formData} />;
            default:
                return <div>No template selected</div>;
        }
    };

    return (
        <div
            className={cn(
                "w-[800px] h-[842px] overflow-auto bg-white print:w-full print:h-full print:overflow-visible",
                className
            )}
            style={{
                transform: `scale(${scaleFactor})`,
                transformOrigin: "top left",
            }}
        >
            <div id="pdf-content" className="w-full min-h-full p-8">
                {renderTemplate()}
            </div>
        </div>
    );
}

export default Preview;
