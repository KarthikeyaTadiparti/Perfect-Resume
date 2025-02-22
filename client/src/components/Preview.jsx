import React from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import { cn } from "@/lib/utils";

function Preview({ formData, template, className, scaleFactor = 1 }) {
    return (
        <div
            className={cn(
                "w-[800px] min-h-[842px] bg-white border-none shadow-none print:w-full print:h-full",
                className
            )}
            style={{
                transform: `scale(${scaleFactor})`,
                transformOrigin: "top left",
            }}
        >
            <div id="pdf-content" className="w-full h-full p-8">
                {formData.template === "1" ? (
                    <Template1 formData={formData} />
                ) : (
                    <Template2 formData={formData} />
                )}
            </div>
        </div>
    );
}

export default Preview;
