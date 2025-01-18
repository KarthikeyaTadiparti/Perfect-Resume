import React from "react";

function Preview({ formData, selectedTemplate }) {
    return (
        <div className="w-[595px] min-h-[842px] bg-white border-none shadow-none print:w-full print:h-full">
            <div id="pdf-content" className="w-full h-full p-4">
                {selectedTemplate === "template1" ? (
                    <div className="p-2 font-cormorant">
                        <div className="text-custom-xlarge font-semibold text-center">
                            {formData.firstName} {formData.lastName}
                            <div className="mt-2 flex text-custom-medium font-normal justify-center items-center">
                                {formData.mobile && (
                                    <div className="flex justify-center items-center">
                                        {formData.mobile}{" "}
                                        <span className="mx-2 font-bold">
                                            |
                                        </span>
                                    </div>
                                )}
                                {formData.email && (
                                    <div className=" flex justify-center items-center">
                                        {formData.email}{" "}
                                        <span className="mx-2 font-bold">
                                            |
                                        </span>
                                    </div>
                                )}
                                {(formData.geo.city ||
                                    formData.geo.country) && (
                                    <div className="flex justify-center items-center">
                                        {formData.geo.city},{" "}
                                        {formData.geo.country}
                                    </div>
                                )}
                            </div>
                        </div>

                        {formData.headline && (
                            <div className="mt-2">
                                <div className="text-custom-large font-semibold">
                                    Career Objective
                                </div>
                                {/* <Separator className="mt-2 bg-black" /> */}
                                <hr />
                                <div className="text-custom-medium mt-2 text-justify  leading-tight">
                                    {formData.headline}
                                </div>
                            </div>
                        )}

                        {(formData.educations[0].schoolName ||
                            formData.educations[0].fieldOfStudy ||
                            formData.educations[0].degree ||
                            formData.educations[0].grade ||
                            formData.educations[0].start.year ||
                            formData.educations[0].end.year) && (
                            <div className="mt-2">
                                <div className="text-custom-large font-semibold">
                                    Education
                                </div>
                                {/* <Separator className="my-2 bg-black " /> */}
                                <hr />
                                {formData.educations.map((edu, idx) => (
                                    <div
                                        key={idx}
                                        className="mt-1 text-custom-medium leading-tight flex justify-between"
                                    >
                                        {(edu.start.year || edu.end.year) && (
                                            <div>
                                                {edu.start.year} -{" "}
                                                {edu.end.year}{" "}
                                            </div>
                                        )}
                                        {(edu.degree ||
                                            edu.fieldOfStudy ||
                                            edu.schoolName) && (
                                            <div className="ml-2 grow">
                                                {edu.degree} ({edu.fieldOfStudy}
                                                ) at {edu.schoolName}
                                            </div>
                                        )}

                                        {edu.grade && (
                                            <div>
                                                (Percentage : {edu.grade}%)
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {(formData.certifications[0].name ||
                            formData.certifications[0].authority) && (
                            <div className="mt-2">
                                <div className="text-custom-large font-semibold">
                                    Certifications
                                </div>
                                {/* <Separator className="my-2 bg-black " /> */}
                                <hr />
                                {formData.certifications.map(
                                    (certificate, idx) => (
                                        <div
                                            key={idx}
                                            className="mt-1 text-custom-medium leading-tight flex"
                                        >
                                            {certificate.name && (
                                                <div>{certificate.name}</div>
                                            )}
                                            {certificate.authority && (
                                                <div className="ml-1 ">
                                                    by{" "}
                                                    <strong>
                                                        {certificate.authority}
                                                    </strong>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
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
        </div>
    );
}

export default Preview;
