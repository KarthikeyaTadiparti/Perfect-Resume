import React from "react";
import html2pdf from "html2pdf.js";
import { Separator } from "./ui/separator";

function Preview({ formData, selectedTemplate }) {
    const handleDownloadPDF = () => {
        const element = document.getElementById("pdf-content"); // Reference to the content container
        const options = {
            margin: [20, 10, 20, 10],
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "px", format: [600, 850], orientation: "portrait" },
        };
        html2pdf().set(options).from(element).save();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Preview Container */}
            <div className="min-h-[842px] w-[595px] bg-white border border-slate-300 shadow-md">
                <div
                    id="pdf-content"
                    className="min-h-[842px] w-[595px] p-4"
                    style={{
                        margin: "0",
                        boxSizing: "border-box",
                    }}
                >
                    {selectedTemplate === "template1" ? (
                        <div className="p-2 font-times">
                            <div className="text-[20px] font-semibold text-center">
                                {formData.firstName} {formData.lastName}
                                <div className="mt-2 flex text-[14px] font-normal justify-center items-center ">
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
                                    <div className="text-[16px] font-semibold">
                                        Career Objective
                                    </div>
                                    <Separator className="mt-2 bg-black" />
                                    <div className="mt-2 text-justify text-[14px] leading-tight ">
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
                                    <div className="text-[16px] font-semibold">
                                        Education
                                    </div>
                                    <Separator className="my-2 bg-black " />
                                    {formData.educations.map((edu, idx) => (
                                        <div
                                            key={idx}
                                            className="mt-1 text-[14px] leading-tight flex justify-between"
                                        >
                                            {(edu.start.year ||
                                                edu.end.year) && (
                                                <div>
                                                    {edu.start.year} -{" "}
                                                    {edu.end.year}{" "}
                                                </div>
                                            )}
                                            {(edu.degree ||
                                                edu.fieldOfStudy ||
                                                edu.schoolName) && (
                                                <div className="ml-2 grow">
                                                    {edu.degree} (
                                                    {edu.fieldOfStudy}) at{" "}
                                                    {edu.schoolName}
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
                                    <div className="text-[16px] font-semibold">
                                        Certifications
                                    </div>
                                    <Separator className="my-2 bg-black " />
                                    {formData.certifications.map(
                                        (certificate, idx) => (
                                            <div
                                                key={idx}
                                                className="mt-1 text-[14px] leading-tight flex"
                                            >
                                                {certificate.name && (
                                                    <div>
                                                        {certificate.name}
                                                    </div>
                                                )}
                                                {certificate.authority && (
                                                    <div className="ml-1 ">
                                                        by{" "}
                                                        <strong>
                                                            {
                                                                certificate.authority
                                                            }
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
                            <h2 className="text-lg font-semibold">
                                Template 2
                            </h2>
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

            {/* Download Button */}
            <button
                onClick={handleDownloadPDF}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 mb-4"
            >
                Download PDF
            </button>
        </div>
    );
}

export default Preview;
