import React, { useState } from "react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

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

function EditFields({
    handleSubmit,
    educationArrayFields,
    certificationArrayFields,
    experienceArrayFields,
    projectArrayFields,
    achievementArrayFields,
    register,
    template,
    getValues,
}) {
    const { id } = useParams();
    const [name, setName] = useState("Untitled Resume");
    console.log("name : " + name);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log("resume id : ", id);

    const onSubmit = async (data) => {
        id
            ? (data = { ...data, template: template })
            : (data = { ...data, template: template, name: name });
        console.log("template : ", template);
        const url = id
            ? `${import.meta.env.VITE_API_URL}/resume/${id}`
            : `${import.meta.env.VITE_API_URL}/resume/new`;
        const method = id ? "put" : "post";

        try {
            setIsSubmitting(true);
            let response = await axios[method](url, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response);
            handleSuccess(response.data.message);
            navigate("/resume");
        } catch (error) {
            console.log(error);
            handleError(error?.response?.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownload = async () => {
        window.print();
    };

    return (
        <div className="print:hidden">
            {isSubmitting && (
                <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-white bg-opacity-60">
                    <div className="spinner"></div>
                </div>
            )}
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

                    {/* Accordion for Skills */}
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Skillsets</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col items-end rounded-b-lg px-8 bg-white border-gray-200 gap-x-4">
                                <Input
                                    labelName="Programming Languages"
                                    placeholder="C, Python, Java "
                                    {...register(`skills.languages`)}
                                />
                                <Input
                                    labelName="Libraries / Frameworks"
                                    placeholder="JavaScript, ReactJs"
                                    {...register(`skills.libraries`)}
                                />
                                <Input
                                    labelName="Tools & Technologies"
                                    placeholder="Git, Vscode"
                                    {...register(`skills.tools`)}
                                />
                                <Input
                                    labelName="Databases"
                                    placeholder="MySQL, MongoDB"
                                    {...register(`skills.databases`)}
                                />
                                {/* <Input
                                    labelName="Others"
                                    placeholder="Enter any other skills"
                                    {...register(`skills.others`)}
                                /> */}
                                <div className="w-full mt-4">
                                    <label
                                        htmlFor="others"
                                        className="block my-2 text-sm text-slate-600"
                                    >
                                        Others
                                    </label>
                                    <textarea
                                        id="others"
                                        rows="6"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 col-span-2"
                                        placeholder="Enter any other skills"
                                        {...register(`skills.others`)}
                                    ></textarea>
                                </div>
                                <br />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Accordion for Certifications */}
                    <AccordionItem value="item-6">
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

                    {/* Accordion for Achievement */}
                    <AccordionItem value="item-7">
                        <AccordionTrigger>Achievements</AccordionTrigger>
                        <AccordionContent>
                            {achievementArrayFields.fields.map((_, idx) => (
                                <div
                                    className="grid grid-cols-[1fr_50px] items-end rounded-b-lg px-8 bg-white border-gray-200 gap-x-4"
                                    key={idx}
                                >
                                    <Input
                                        labelName="Achievement"
                                        {...register(
                                            `achievements.${idx}.name`
                                        )}
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                achievementArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "There must be atleast at least one Field"
                                                );
                                            } else {
                                                achievementArrayFields.remove(
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
                                        achievementArrayFields.append(
                                            achievementFormDefaultValues
                                        )
                                    }
                                >
                                    <FiPlus /> Add Achievement
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-4 flex justify-between">
                    {id ? (
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type="button">Submit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="mb-2">
                                        Resume's Name
                                    </DialogTitle>
                                    <DialogDescription>
                                        Please Enter the name of the resume
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <input
                                            id="name"
                                            name="name"
                                            className="w-full bg-transparent bg-gray-50 text-slate-700 text-sm border border-slate-200 rounded-md px-2 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <DialogFooter className="sm:justify-start mt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isSubmitting}
                                        onClick={() => onSubmit(getValues())}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <div className="loader"></div>
                                            </span>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                    <Button type="button" onClick={handleDownload}>
                        Download PDF
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditFields;
