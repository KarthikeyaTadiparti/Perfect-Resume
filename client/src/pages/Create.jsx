import React, { useEffect, useState } from "react";
import EditFields from "../components/EditFields";
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
import { merge } from "lodash";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

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
const experienceFormDefaultValues = {
    companyName: "",
    title: "",
    location: "",
    description: "",
    start: { year: "" },
    end: { year: "" },
};
const projectFormDefaultValues = {
    title: "",
    description: "",
    technologies: "",
    links: "",
};
const achievementFormDefaultValues = {
    name: "",
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
    experiences: [experienceFormDefaultValues],
    projects: [projectFormDefaultValues],
    achievements: [achievementFormDefaultValues],
    skills: {
        languages: "",
        libraries: "",
        tools: "",
        databases: "",
        others: "",
    },
    template: "1",
};

function Create() {
    const ResumeInfo = useSelector((state) => state.resume.ResumeInfo);

    const {
        register,
        handleSubmit,
        getValues,
        control,
        reset,
        watch,
        setValue,
    } = useForm({
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
    const experienceArrayFields = useFieldArray({
        control,
        name: "experiences",
    });
    const projectArrayFields = useFieldArray({
        control,
        name: "projects",
    });
    const achievementArrayFields = useFieldArray({
        control,
        name: "achievements",
    });

    console.log("GET", getValues());

    useEffect(() => {
        console.log("In create page : ", ResumeInfo);
        if (ResumeInfo) {
            const mergedData = merge({}, formDefaultValues, ResumeInfo);
            reset(mergedData);
        }
    }, [ResumeInfo, reset]);

    const formData = watch();
    const [template, setTemplate] = useState(ResumeInfo?.template || "1");

    useEffect(() => {
        if (formData.template !== template) {
            setTemplate(formData.template);
        }
    }, [formData.template]);

    const handleTemplateChange = (newTemplate) => {
        setTemplate(newTemplate);
        setValue("template", newTemplate);
    };

    return (
        <div className="w-screen h-full overflow-hidden">
            <Sheet>
                <SheetTrigger className="fixed top-28 border-2 p-2 bg-white rounded-md print:hidden flex flex-col justify-center items-center gap-2">
                    <FaArrowRight />
                    <div className="vertical-text">Templates</div>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle className="text-center mb-2">
                            Select Template
                        </SheetTitle>
                        <SheetDescription className="grid grid-cols-2 justify-center gap-5">
                            <button className="flex flex-col justify-center items-center">
                                <img
                                    src="/images/Template1.jpg"
                                    loading="eager"
                                    className={`flex-1 w-44 h-60 object-cover overflow-hidden rounded-md border-2 transition-all duration-300 ${
                                        template === "1"
                                            ? "bg-blue-500 text-white border-blue-400 shadow-lg scale-[1.01]"
                                            : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                                    }`}
                                    onClick={() => handleTemplateChange("1")}
                                />
                                <div className="mt-2 font-medium">
                                    Classic Template
                                </div>
                            </button>

                            <button className="flex flex-col justify-center items-center">
                                <img
                                    src="/images/Template2.jpg"
                                    loading="eager"
                                    className={`flex-1 w-44 h-60 object-cover overflow-hidden rounded-md border-2 transition-all duration-300 ${
                                        template === "2"
                                            ? "bg-blue-500 text-white border-blue-400 shadow-lg scale-[1.01]"
                                            : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                                    }`}
                                    onClick={() => handleTemplateChange("2")}
                                />
                                <div className="text-center mt-2 font-medium">
                                    Modern Template
                                </div>
                            </button>

                            <button className="flex flex-col justify-center items-center">
                                <img
                                    src="/images/Template3.jpg"
                                    loading="eager"
                                    className={`flex-1 w-44 h-60 object-cover overflow-hidden rounded-md border-2 transition-all duration-300 ${
                                        template === "3"
                                            ? "bg-blue-500 text-white border-blue-400 shadow-lg scale-[1.01]"
                                            : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                                    }`}
                                    onClick={() => handleTemplateChange("3")}
                                />
                                <div className=" mt-2 font-medium">
                                    Blue and White Professional Template
                                </div>
                            </button>

                            <button className="flex flex-col justify-center items-center">
                                <img
                                    src="/images/Template4.jpg"
                                    loading="eager"
                                    className={`flex-1 w-44 h-60 object-fill overflow-hidden rounded-md border-2 transition-all duration-300 ${
                                        template === "4"
                                            ? "bg-blue-500 text-white border-blue-400 shadow-lg scale-[1.01]"
                                            : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                                    }`}
                                    onClick={() => handleTemplateChange("4")}
                                />
                                <div className=" mt-2 font-medium">
                                    Compact Template
                                </div>
                            </button>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <div className="w-4/5 my-10 mx-auto flex gap-5 print:w-full print:h-full print:p-0 print:m-0">
                <div className="w-1/3 h-full print:hidden">
                    <EditFields
                        handleSubmit={handleSubmit}
                        educationArrayFields={educationArrayFields}
                        certificationArrayFields={certificationArrayFields}
                        experienceArrayFields={experienceArrayFields}
                        projectArrayFields={projectArrayFields}
                        achievementArrayFields={achievementArrayFields}
                        register={register}
                        template={template}
                        getValues={getValues}
                    />
                </div>
                <div className="w-2/3 h-full border-2 print:border-none shadow-md print:shadow-none">
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    );
}

export default Create;
