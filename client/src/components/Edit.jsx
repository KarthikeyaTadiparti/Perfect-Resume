import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const educationFormDefaultValues = {
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    grade: "",
    start: "",
    end: "",
};

function Edit({ handleSubmit, educationArrayFields, register }) {
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div >
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
                                <Input labelName="City" {...register("geo.city")} />
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
                                    className="pb-4 pt-0 rounded-b-lg px-8 bg-white border-gray-200 grid grid-cols-2 gap-x-4"
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
                                        {...register(`educations.${idx}.degree`)}
                                    />
                                    <Input
                                        labelName="Percentage"
                                        {...register(`educations.${idx}.grade`)}
                                    />
                                    <Input
                                        labelName="From"
                                        placeholder="Year (e.g., 2020)"
                                        {...register(`educations.${idx}.start.year`)}
                                    />
                                    <Input
                                        labelName="To"
                                        placeholder="Year (e.g., 2024)"
                                        {...register(`educations.${idx}.end.year`)}
                                    />
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
                </Accordion>

                <Button className="mt-4">Submit</Button>
            </form>
        </div>
    );
}

export default Edit;
