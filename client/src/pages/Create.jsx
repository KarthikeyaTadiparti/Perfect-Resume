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
                <SheetTrigger className="absolute border size-10 bg-white rounded-md print:hidden">
                    <i className="fa-solid fa-arrow-right"></i>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Select Template</SheetTitle>
                        <SheetDescription className="flex justify-center gap-10">
                            <button
                                className={`px-4 py-2 border rounded ${
                                    template === "1"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                }`}
                                onClick={() => handleTemplateChange("1")}
                            >
                                Template 1
                            </button>
                            <button
                                className={`px-4 py-2 border rounded ${
                                    template === "2"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                }`}
                                onClick={() => handleTemplateChange("2")}
                            >
                                Template 2
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
                    />
                </div>
                <div className="w-2/3 h-full">
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    );
}

export default Create;
