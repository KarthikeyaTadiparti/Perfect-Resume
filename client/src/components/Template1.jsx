import React from "react";

function Template1({ formData }) {
    return (
        <div className="font-cormorant">
            <div className="text-custom-xlarge font-semibold text-center">
                {formData.firstName} {formData.lastName}
                <div className="mt-2 flex text-custom-small divide-solid divide-x-[1px] divide-gray-900 font-normal justify-center items-center">
                    {formData.mobile && (
                        <div className="px-2">{formData.mobile}</div>
                    )}
                    {formData.email && (
                        <div className="px-2">{formData.email}</div>
                    )}
                    {(formData.geo?.city || formData.geo?.country) && (
                        <div className="px-2">
                            {formData.geo?.city && formData.geo?.country
                                ? `${formData.geo.city}, ${formData.geo.country}`
                                : formData.geo.city || formData.geo.country}
                        </div>
                    )}
                </div>
            </div>

            {formData.headline && (
                <div className="mt-2">
                    <div className="text-custom-large font-semibold">
                        Career Objective
                    </div>
                    <hr className="border-gray-600" />
                    <div className="text-custom-small mt-2 text-justify  leading-tight">
                        {formData.headline}
                    </div>
                </div>
            )}

            {formData.educations && (formData.educations[0]?.schoolName ||
                formData.educations[0]?.fieldOfStudy ||
                formData.educations[0]?.degree ||
                formData.educations[0]?.grade ||
                formData.educations[0]?.start.year ||
                formData.educations[0]?.end.year) && (
                <div className="mt-2">
                    <div className="text-custom-large font-semibold">
                        Education
                    </div>
                 
                    <hr className="border-gray-600" />
                    
                    {formData.educations.map((edu, idx) => (
                        <div
                            key={idx}
                            className="mt-1 text-custom-small leading-tight flex justify-between"
                        >
                            {(edu.start.year || edu.end.year) && (
                                <div>
                                    {edu.start.year} - {edu.end.year}{" "}
                                </div>
                            )}
                            {(edu.degree ||
                                edu.fieldOfStudy ||
                                edu.schoolName) && (
                                <div className="ml-2 grow">
                                    {edu.degree} ({edu.fieldOfStudy}) at{" "}
                                    {edu.schoolName}
                                </div>
                            )}

                            {edu.grade && (
                                <div>(Percentage : {edu.grade}%)</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {formData.certifications && (formData.certifications[0]?.name ||
                formData.certifications[0]?.authority) && (
                <div className="mt-2">
                    <div className="text-custom-large font-semibold">
                        Certifications
                    </div>
                    <hr className="border-gray-600" />
                    {formData.certifications.map((certificate, idx) => (
                        <div
                            key={idx}
                            className="mt-1 text-custom-small leading-tight flex"
                        >
                            {certificate.name && <div>{certificate.name}</div>}
                            {certificate.authority && (
                                <div className="ml-1 ">
                                    by <strong>{certificate.authority}</strong>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Template1;
