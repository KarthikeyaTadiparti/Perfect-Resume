import axios from "axios";
import React, { useEffect, useState } from "react";
import Edit from "../components/Edit";
import Preview from "../components/Preview";
import { useForm, useFieldArray } from "react-hook-form";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { data } from "../data";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const educationFormDefaultValues = {
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    grade: "",
    start: { year: "" },
    end: { year: "" },
};
const formDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    geo: {
        city: "",
        country: "",
    },
    headline: "",
    educations: [educationFormDefaultValues],
};

function Create() {
    const { register, handleSubmit, getValues, control, reset, watch } =
        useForm({
            defaultValues: formDefaultValues,
        });
    const educationArrayFields = useFieldArray({
        control,
        name: "educations",
    });

    console.log("GET", getValues());
    // useEffect(() => {
    //     reset({...formDefaultValues, firstName: 'Hareesh', lastName: 'Tadiparti'})
    // }, [])
    // console.log("GET", getValues());

    const [selectedTemplate, setSelectedTemplate] = useState("template1");

    const formData = watch();

    //Api
    const options = {
        method: "GET",
        url: "https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url",
        params: {
            url: "https://www.linkedin.com/in/adamselipsky/",
        },
        headers: {
            "x-rapidapi-key":
                "3e9a3935f1mshf8b8c5d3f9f4eb7p1e8cecjsn1ec21de6aef5",
            "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        },
    };

    const callApi = async () => {
        try {
            // const response = await axios.request(options);
            // console.log("API Response:", response.data);

            // const apiData = response.data;
            // console.log("api : ", apiData.educations);

            console.log(data);
            const apiData = data;
            const mappedData = {
                firstName: apiData.firstName || "",
                lastName: apiData.lastName || "",
                email: apiData.email || "",
                mobile: apiData.mobile || "",
                geo: {
                    city: apiData.geo.city || "",
                    country: apiData.geo.country || "",
                },
                headline: apiData.headline || "",
                educations: [...apiData.educations] || [
                    educationFormDefaultValues,
                ],
            };

            // Update the form using reset
            reset(mappedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSaveAsPDF = async () => {
        const element = document.getElementById("previewBox");
        const canvas = await html2canvas(element, {
            scale: 3,
          });
          const data = canvas.toDataURL("image/png");
      
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
          });
      
          const imgProperties = pdf.getImageProperties(data);
          const pdfWidth = pdf.internal.pageSize.getWidth();
      
          const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      
          pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("examplepdf.pdf");
    };
    

    return (
        <div className="w-screen h-full flex">
            <Sheet>
                <SheetTrigger className="absolute border size-10 bg-white rounded-md">
                    <i className="fa-solid fa-arrow-right"></i>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Select Template</SheetTitle>
                        <SheetDescription className="flex justify-center gap-10">
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
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <div className="w-4/5 flex flex-col my-10 mx-auto ">
                <div className="w-full flex gap-5">
                    <div className="w-1/2">
                        <Edit
                            handleSubmit={handleSubmit}
                            educationArrayFields={educationArrayFields}
                            register={register}
                        />
                        <Button
                            onClick={callApi}
                            variant="destructive"
                            className="mt-4"
                        >
                            Get Data
                        </Button>

                        <Button
                            onClick={handleSaveAsPDF}
                            variant="outline"
                            className="mx-6 mt-4"
                        >
                            PDF
                        </Button>
                    </div>
                    <div className="w-1/2">
                        <Preview
                            formData={formData}
                            selectedTemplate={selectedTemplate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
