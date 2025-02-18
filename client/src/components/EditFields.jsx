import React from "react";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { FaTrash } from "react-icons/fa6";
import { handleError, handleSuccess } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
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

function EditFields({
    handleSubmit,
    educationArrayFields,
    certificationArrayFields,
    experienceArrayFields,
    projectArrayFields,
    register,
}) {
    // const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("resume id : ", id);

    const onSubmit = async (data) => {
        // console.log(data);

        //creates new resume
        if (!id) {
            try {
                let response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/resume/new`,
                    data,
                    {
                        headers: {
                            // Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                console.log(response);
                handleSuccess(response.data.message);
                navigate("/resume");
            } catch (error) {
                console.log(error);
                let msg = error?.response?.data?.message;
                handleError(msg);
            }
        }
        //updates the existing resume
        else {
            try {
                let response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/resume/${id}`,
                    data,
                    {
                        headers: {
                            // Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                console.log(response);
                handleSuccess(response.data.message);
                navigate("/resume");
            } catch (error) {
                console.log(error);
                let msg = error?.response?.data?.message;
                handleError(msg);
            }
        }
    };

    const handleDownload = async () => {
        window.print();
    };

    return (
        <div className="print:hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Accordion type="single" collapsible>
                    {/* Accordion for Personal Information */}
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Personal Information
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pb-4 pt-0 rounded-b-lg px-8 bg-white border-gray-200 grid grid-cols-2 gap-x-4">
                                <Input
                                    labelName="First Name"
                                    {...register("firstName")}
                                />
                                <Input
                                    labelName="Last Name"
                                    {...register("lastName")}
                                />
                                <Input
                                    labelName="Email"
                                    {...register("email")}
                                />
                                <Input
                                    labelName="Mobile Number"
                                    {...register("mobile")}
                                />
                                <Input
                                    labelName="City"
                                    {...register("geo.city")}
                                />
                                <Input
                                    labelName="Country"
                                    {...register("geo.country")}
                                />

                                <label
                                    htmlFor="objective"
                                    className="block my-2 text-sm text-slate-600 col-span-2"
                                >
                                    Your Objective
                                </label>
                                <textarea
                                    id="objective"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 col-span-2"
                                    placeholder="Write your objective here..."
                                    {...register("headline")}
                                ></textarea>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Accordion for Education */}
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Education</AccordionTrigger>
                        <AccordionContent>
                            {educationArrayFields.fields.map((_, idx) => (
                                <div
                                    className="grid grid-cols-2 rounded-b-lg px-8 bg-white border-gray-200 gap-x-4"
                                    key={idx}
                                >
                                    <Input
                                        labelName="Institution Name"
                                        {...register(
                                            `educations.${idx}.schoolName`
                                        )}
                                    />
                                    <Input
                                        labelName="Field of Study"
                                        {...register(
                                            `educations.${idx}.fieldOfStudy`
                                        )}
                                    />
                                    <Input
                                        labelName="Degree"
                                        {...register(
                                            `educations.${idx}.degree`
                                        )}
                                    />
                                    <Input
                                        labelName="Percentage"
                                        {...register(`educations.${idx}.grade`)}
                                    />
                                    <Input
                                        labelName="From"
                                        placeholder="Year (e.g., 2020)"
                                        {...register(
                                            `educations.${idx}.start.year`
                                        )}
                                    />
                                    <Input
                                        labelName="To"
                                        placeholder="Year (e.g., 2024)"
                                        {...register(
                                            `educations.${idx}.end.year`
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                educationArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "There must be atleast at least one Education Field"
                                                );
                                            } else {
                                                educationArrayFields.remove(
                                                    idx
                                                );
                                            }
                                        }}
                                        variant="destructive"
                                        className="mt-6 col-span-2"
                                    >
                                        <FaTrash />
                                    </Button>

                                    <Separator className="col-span-2 mt-4" />
                                </div>
                            ))}

                            <div className="px-8">
                                <Button
                                    type="button"
                                    className="w-full bg-pri-blue col-span-2 my-4 text-white py-2 px-4 rounded-md hover:bg-dark-pri-blue flex justify-center items-center"
                                    onClick={() =>
                                        educationArrayFields.append(
                                            educationFormDefaultValues
                                        )
                                    }
                                >
                                    <FiPlus /> Add Education
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Accordion for Experience */}
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Experience</AccordionTrigger>
                        <AccordionContent>
                            {experienceArrayFields.fields.map((_, idx) => (
                                <div
                                    className="grid grid-cols-2 rounded-b-lg px-8 bg-white border-gray-200 gap-x-4"
                                    key={idx}
                                >
                                    <Input
                                        labelName="Company Name"
                                        {...register(
                                            `experiences.${idx}.companyName`
                                        )}
                                    />
                                    <Input
                                        labelName="Job Title"
                                        {...register(
                                            `experiences.${idx}.title`
                                        )}
                                    />
                                    <Input
                                        labelName="From"
                                        placeholder="Year (e.g., 2020)"
                                        {...register(
                                            `experiences.${idx}.start.year`
                                        )}
                                    />
                                    <Input
                                        labelName="To"
                                        placeholder="Year (e.g., 2024)"
                                        {...register(
                                            `experiences.${idx}.end.year`
                                        )}
                                    />
                                    <Input
                                        labelName="Location"
                                        className="col-span-2"
                                        {...register(
                                            `experiences.${idx}.location`
                                        )}
                                    />
                                    <label
                                        htmlFor="description"
                                        className="block my-2 text-sm text-slate-600 col-span-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 col-span-2"
                                        placeholder="Describe about the things you did while working in the company"
                                        {...register(
                                            `experiences.${idx}.description`
                                        )}
                                    ></textarea>
                                    <Button
                                        type="button"
                                        className="mt-6 col-span-2"
                                        onClick={() => {
                                            if (
                                                experienceArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "There must be atleast at least one Experience Field"
                                                );
                                            } else {
                                                experienceArrayFields.remove(
                                                    idx
                                                );
                                            }
                                        }}
                                        variant="destructive"
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Separator className="col-span-2 mt-4" />
                                </div>
                            ))}

                            <div className="px-8">
                                <Button
                                    type="button"
                                    className="w-full bg-pri-blue col-span-2 my-4 text-white py-2 px-4 rounded-md hover:bg-dark-pri-blue flex justify-center items-center"
                                    onClick={() =>
                                        experienceArrayFields.append(
                                            experienceFormDefaultValues
                                        )
                                    }
                                >
                                    <FiPlus /> Add Experience
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Accordion for Projects */}
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Projects</AccordionTrigger>
                        <AccordionContent>
                            {projectArrayFields.fields.map((_, idx) => (
                                <div
                                    className="grid grid-cols-2 rounded-b-lg px-8 bg-white border-gray-200 gap-x-4"
                                    key={idx}
                                >
                                    <Input
                                        labelName="Project Title"
                                        {...register(`projects.${idx}.title`)}
                                    />
                                    <Input
                                        labelName="Technologies Used"
                                        {...register(
                                            `projects.${idx}.technologies`
                                        )}
                                    />
                                    <Input
                                        labelName="Project Links"
                                        className="col-span-2"
                                        {...register(`projects.${idx}.links`)}
                                    />
                                    <label
                                        htmlFor="description"
                                        className="block my-2 text-sm text-slate-600 col-span-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 col-span-2"
                                        placeholder="Describe your project "
                                        {...register(
                                            `projects.${idx}.description`
                                        )}
                                    ></textarea>
                                    <Button
                                        type="button"
                                        className="mt-6 col-span-2"
                                        onClick={() => {
                                            if (
                                                projectArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "There must be atleast at least one Project Field"
                                                );
                                            } else {
                                                projectArrayFields.remove(idx);
                                            }
                                        }}
                                        variant="destructive"
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Separator className="col-span-2 mt-4" />
                                </div>
                            ))}

                            <div className="px-8">
                                <Button
                                    type="button"
                                    className="w-full bg-pri-blue col-span-2 my-4 text-white py-2 px-4 rounded-md hover:bg-dark-pri-blue flex justify-center items-center"
                                    onClick={() =>
                                        projectArrayFields.append(
                                            projectFormDefaultValues
                                        )
                                    }
                                >
                                    <FiPlus /> Add Project
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Accordion for Certifications */}
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Certifications</AccordionTrigger>
                        <AccordionContent>
                            {certificationArrayFields.fields.map((_, idx) => (
                                <div
                                    className="grid grid-cols-[1fr_1fr_50px] items-end rounded-b-lg px-8 bg-white border-gray-200 gap-x-4"
                                    key={idx}
                                >
                                    <Input
                                        labelName="Certification Name"
                                        {...register(
                                            `certifications.${idx}.name`
                                        )}
                                    />
                                    <Input
                                        labelName="Authority"
                                        {...register(
                                            `certifications.${idx}.authority`
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                certificationArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "There must be atleast at least one Certification Field"
                                                );
                                            } else {
                                                certificationArrayFields.remove(
                                                    idx
                                                );
                                            }
                                        }}
                                        variant="destructive"
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Separator className="col-span-2 mt-4" />
                                </div>
                            ))}

                            <div className="px-8">
                                <Button
                                    type="button"
                                    className="w-full bg-pri-blue col-span-2 my-4 text-white py-2 px-4 rounded-md hover:bg-dark-pri-blue flex justify-center items-center"
                                    onClick={() =>
                                        certificationArrayFields.append(
                                            certificationFormDefaultValues
                                        )
                                    }
                                >
                                    <FiPlus /> Add Certification
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-4 flex justify-between">
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={handleDownload}>
                        Download PDF
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditFields;
