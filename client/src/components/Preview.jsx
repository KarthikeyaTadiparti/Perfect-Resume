import React from "react";
import { Separator } from "@/components/ui/separator";

function Preview({ formData, selectedTemplate }) {
    return (
        <div
            id="previewBox"
            className="h-[842px] w-[595px] bg-white border border-slate-300 shadow-md p-4"
        >
            {selectedTemplate === "template1" ? (
                <div className="p-2 font-times">
                    <div className="text-[20px] font-semibold text-center">
                        {formData.firstName} {formData.lastName}
                        <div className="flex text-[14px] font-normal">
                            <div>{formData.mobile}</div>
                            <div>{formData.email}</div>
                            {formData.geo.city || formData.geo.country ? (
                                <div>
                                    {formData.geo.city},{formData.geo.county}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    {formData.headline ? (
                        <div className="mt-2">
                            <div className="text-[16px] font-semibold">
                                Career Objective
                            </div>
                            <Separator className="my-2 bg-black" />
                            <div className="mt-2 text-justify text-[14px] leading-tight ">
                                {formData.headline}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {formData.educations[0].schoolName ||
                    formData.educations[0].fieldOfStudy ||
                    formData.educations[0].degree ||
                    formData.educations[0].grade ||
                    formData.educations[0].start.year ||
                    formData.educations[0].end.year ? (
                        <div className="mt-2">
                            <div className="text-[16px] font-semibold">
                                Education
                            </div>
                            <Separator className="my-2 bg-black " />
                            {formData.educations.map((edu, idx) => (
                                <div
                                    key={idx}
                                    className="mt-1 text-[14px] text-justify leading-tight flex"
                                >
                                    {edu.start.year || edu.end.year ? (
                                        <div>
                                            {edu.start.year} - {edu.end.year}{" "}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {edu.degree || edu.fieldOfStudy ? (
                                        <div className="ml-2">
                                            {edu.degree} ({edu.fieldOfStudy}) at
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="font-semibold ml-2 grow">
                                        {edu.schoolName}
                                    </div>
                                    {edu.grade ? (
                                        <div className="">
                                            (Percentage : {edu.grade}%)
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold">Template 2</h2>
                    <p>
                        {formData.firstName} {formData.lastName}
                    </p>
                    <p>Email: {formData.email}</p>
                    <p>Mobile: {formData.mobile}</p>
                    <p>
                        Location: {formData.city}, {formData.state}
                    </p>
                    <p>
                        <strong>Objective:</strong>
                    </p>
                    <p>{formData.objective}</p>
                </div>
            )}
        </div>
    );
}

export default Preview;
