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
import { handleError, handleSuccess } from "@/utils/utils";
import { useNavigate } from "react-router-dom";

const educationFormDefaultValues = {
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    grade: "",
    start: "",
    end: "",
};
const certificationFormDefaultValues = {
    name: "",
    authority: "",
};

function Edit({
    handleSubmit,
    educationArrayFields,
    certificationArrayFields,
    register,
}) {
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // console.log(data);
        //send to db
        try {
            let response = await axios.post(
                "http://localhost:3000/resume/new",
                data,
                {
                    headers: { "Content-Type": "application/json" },
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
        
    };

    const handleDownload = async () => {
        window.print();
    };

    return (
        <div className="print:hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Accordion for Personal Information */}
                <Accordion type="single" collapsible>
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
                                        onClick={() => {
                                            if (
                                                educationArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "It must have at least one Education Field"
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
                                <button
                                    type="button"
                                    className="w-full bg-pri-blue col-span-2 my-4 text-white py-2 px-4 rounded-md hover:bg-dark-pri-blue"
                                    onClick={() =>
                                        educationArrayFields.append(
                                            educationFormDefaultValues
                                        )
                                    }
                                >
                                    Add Another Education
                                </button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Accordion for Certifications */}
                    <AccordionItem value="item-3">
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
                                        onClick={() => {
                                            if (
                                                certificationArrayFields.fields
                                                    .length === 1
                                            ) {
                                                return handleError(
                                                    "It must have at least one Certification Field"
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
                                <button
                                    type="button"
                                    className="w-full bg-pri-blue col-span-2 my-4 text-white py-2 px-4 rounded-md hover:bg-dark-pri-blue"
                                    onClick={() => {}}
                                >
                                    Add Another Certification
                                </button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-4 flex justify-between">
                    <Button type="submit">Submit</Button>
                    <Button onClick={handleDownload}>Download PDF</Button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
