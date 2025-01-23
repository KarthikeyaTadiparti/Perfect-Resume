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

const educationFormDefaultValues = {
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    grade: "",
    start: { year: "" },
    end: { year: "" },
};
const certificationFormDefaultValues = {
    name: "",
    authority: "",
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
    certifications: [certificationFormDefaultValues],
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
    const certificationArrayFields = useFieldArray({
        control,
        name: "certifications",
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

            // console.log(data);
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
                certifications: apiData.certifications.map((certificate) => ({
                    name: certificate.name || "",
                    authority: certificate.authority || "",
                })),
            };

            // Update the form using reset
            reset(mappedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-screen h-full">
            <Sheet>
                <SheetTrigger className="absolute border size-10 bg-white rounded-md print:hidden">
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

            <div className="w-4/5 my-10 mx-auto flex gap-5 print:w-full print:h-full print:p-0 print:m-0">
                <div className="w-full h-full print:hidden">
                    <Edit
                        handleSubmit={handleSubmit}
                        educationArrayFields={educationArrayFields}
                        certificationArrayFields={certificationArrayFields}
                        register={register}
                    />
                    <Button
                        onClick={callApi}
                        variant="destructive"
                        className="mt-4"
                    >
                        Get Data
                    </Button>
                </div>
                <div className="w-full h-full m-0 p-0">
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
