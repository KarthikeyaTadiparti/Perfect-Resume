import React from "react";
import Input from "./Input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function Edit({ formData, setFormData }) {
    const handleChanges = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Personal Information</AccordionTrigger>
                    <AccordionContent>
                        <Input
                            value={formData.firstName}
                            labelName="First Name"
                            name="firstName"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.lastName}
                            labelName="Last Name"
                            name="lastName"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.email}
                            labelName="Email"
                            name="email"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.mobile}
                            labelName="Mobile Number"
                            name="mobile"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.city}
                            labelName="City"
                            name="city"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.state}
                            name="state"
                            labelName="State"
                            handleChanges={handleChanges}
                        />
                        <label
                            htmlFor="message"
                            className="block my-2 text-sm text-slate-600 col-span-2"
                        >
                            Your Objective
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 col-span-2"
                            placeholder="Write your objective here..."
                            name="objective"
                            value={formData.objective}
                            onChange={handleChanges}
                        ></textarea>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Education</AccordionTrigger>
                    <AccordionContent>
                        <Input
                            value={formData.schoolName}
                            labelName="Institution Name"
                            name="schoolName"
                            placeholder="Enter Instituiton Name"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.fieldOfStudy}
                            labelName="Field of Study"
                            name="fieldOfStudy"
                            placeholder="Enter Instituiton Name"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.degree}
                            labelName="Degree"
                            name="degree"
                            placeholder="Enter Degree"
                            handleChanges={handleChanges}
                        />
                        <Input
                            value={formData.grade}
                            labelName="Percentage"
                            name="grade"
                            placeholder="Enter percentage"
                            handleChanges={handleChanges}
                        />

                        {/* <div className="flex gap-4">
                            <div className="w-full max-w-sm min-w-[200px] mt-2">
                                <label
                                    for="from"
                                    className="block mb-2 text-sm text-slate-600"
                                >
                                    From
                                </label>
                                <input
                                    type="number"
                                    className="from inputFields"
                                    name="from"
                                    placeholder="Year (e.g., 2020)"
                                    oninput="updatePreview()"
                                />
                            </div>
                            <div className="w-full max-w-sm min-w-[200px] mt-2">
                                <label
                                    for="to"
                                    className="block mb-2 text-sm text-slate-600"
                                >
                                    To
                                </label>
                                <input
                                    type="number"
                                    className="to inputFields"
                                    name="to"
                                    placeholder="Year (e.g., 2024)"
                                    oninput="updatePreview()"
                                />
                            </div>
                        </div> */}

                        <button
                            type="button"
                            className="bg-pri-blue col-span-2 mt-4 text-white py-3 rounded-md hover:bg-dark-pri-blue"
                            onClick=""
                        >
                            Add Another Education
                        </button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Edit;
