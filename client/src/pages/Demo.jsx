import React from "react";
import Preview from "@/components/Preview";
import {data} from "../data"
import {Button} from "../components/ui/button"
function Demo() {
    const handleDownload = () =>{
        window.print();
    }
    return (
        <div>
            <h1 className="print:hidden">Hello</h1>
            <div className="border-red-500">
            <Preview formData={data} selectedTemplate="template1" />
            </div>
            
            <Button className="print:hidden" onClick={handleDownload}>Download</Button>
        </div>
    );
}

export default Demo;
