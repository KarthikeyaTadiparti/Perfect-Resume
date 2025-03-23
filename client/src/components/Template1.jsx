import React from "react";

function Template1({ formData }) {
    return (
        <div className="font-spectral font-light tracking-tight">
            <div className="text-center">
                <div className="text-3xl font-medium tracking-wide">
                    {formData.firstName} {formData.lastName}
                </div>

                <div className="mt-2 flex text-sm divide-solid divide-x-[1px] divide-gray-900 justify-center items-center">
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
                    <div className="text-xl font-bold">
                        Career Objective
                    </div>
                    <hr className="border-gray-600" />
                    <div className=" mt-2 text-justify  leading-tight">
                        {formData.headline}
                    </div>
                </div>
            )}

            {formData.educations &&
                (formData.educations[0]?.schoolName ||
                    formData.educations[0]?.fieldOfStudy ||
                    formData.educations[0]?.degree ||
                    formData.educations[0]?.grade ||
                    formData.educations[0]?.start.year ||
                    formData.educations[0]?.end.year) && (
                    <div className="mt-2">
                        <div className="text-xl font-bold">Education</div>

                        <hr className="border-gray-600" />

                        {formData.educations.map((edu, idx) => (
                            <div
                                key={idx}
                                className="mt-1  leading-tight flex justify-between"
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
                                        <span className="font-semibold">{edu.schoolName}</span>
                                    </div>
                                )}

                                {edu.grade && (
                                    <div>(Percentage/CGPA : {edu.grade})</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            {formData.experiences &&
                (formData.experiences[0]?.companyName ||
                    formData.experiences[0]?.title ||
                    formData.experiences[0]?.location ||
                    formData.experiences[0]?.start.year ||
                    formData.experiences[0]?.end.year) && (
                    <div className="mt-2">
                        <div className="text-xl font-bold">Experience</div>

                        <hr className="border-gray-600" />

                        {formData.experiences.map((ex, idx) => (
                            <div
                                key={idx}
                                className="mt-1 leading-tight"
                            >
                                <div className="flex justify-between">
                                    <div className="mt-2 flex font-bold divide-solid divide-x-[1px] divide-gray-900 justify-center items-center">
                                        {ex.companyName && (
                                            <div className="pr-2">
                                                {ex.companyName}
                                            </div>
                                        )}
                                        {ex.title && (
                                            <div className="pl-2">
                                                {ex.title}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-2 flex divide-solid divide-x-[1px] divide-gray-900 font-normal justify-center items-center">
                                        {ex.location && (
                                            <div className="px-2">
                                                {ex.location}
                                            </div>
                                        )}
                                        {(ex.start.year || ex.end.year) && (
                                            <div className="px-2">
                                                {ex.start.year} - {ex.end.year}{" "}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {ex.description && (
                                    <div className="ml-4 px-2 text-justify leading-tight">
                                        {ex.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            {formData.projects &&
                (formData.projects[0]?.title ||
                    formData.projects[0]?.description ||
                    formData.projects[0]?.technologies ||
                    formData.projects[0]?.links) && (
                    <div className="mt-2">
                        <div className="text-xl font-bold">Projects</div>

                        <hr className="border-gray-600" />

                        {formData.projects.map((pro, idx) => (
                            <div
                                key={idx}
                                className="mt-1  leading-tight"
                            >
                                <div className="flex justify-between">
                                    <div className="mt-2 font-semibold">
                                        {pro.title && (
                                            <div className="pr-2">
                                                {pro.title}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-2 font-semibold">
                                        {pro.technologies && (
                                            <div className="px-2">
                                                {pro.technologies}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {pro.links && (
                                    <div className="px-6 mt-1">
                                        <span className="font-semibold">Link : </span>
                                        {pro.links}
                                    </div>
                                )}
                                {pro.description && (
                                    <div className="ml-4 px-2 text-justify leading-tight">
                                        {pro.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            {formData.skills &&
                (formData.skills.languages ||
                    formData.skills.databases ||
                    formData.skills.tools ||
                    formData.skills.libraries ||
                    formData.skills.others) && (
                    <div className="mt-2">
                        <div className="text-xl font-bold">Skillsets</div>
                        <hr className="border-gray-600" />
                        <div className="ml-8 ">
                            {formData.skills.languages && (
                                <div>
                                    <span className="font-semibold">Programming Languages : </span>{" "}
                                    {formData.skills.languages}
                                </div>
                            )}
                            {formData.skills.libraries && (
                                <div>
                                    <span className="font-semibold">Libraries/Frameworks : </span>{" "}
                                    {formData.skills.libraries}
                                </div>
                            )}
                            {formData.skills.tools && (
                                <div>
                                    <span className="font-semibold">Tools & Technologies : </span>{" "}
                                    {formData.skills.tools}
                                </div>
                            )}
                            {formData.skills.databases && (
                                <div>
                                    <span className="font-semibold">Databases : </span>{" "}
                                    {formData.skills.databases}
                                </div>
                            )}
                            {formData.skills.others && (
                                <div>
                                    <span className="font-semibold">Others : </span>
                                    {" " + formData.skills.others}
                                </div>
                            )}
                        </div>
                    </div>
                )}

            {formData.certifications &&
                (formData.certifications[0]?.name ||
                    formData.certifications[0]?.authority) && (
                    <div className="mt-2">
                        <div className="text-xl font-bold">
                            Certifications
                        </div>
                        <hr className="border-gray-600" />
                        <ul className="list-disc ml-8 mt-2">
                            {formData.certifications.map((certificate, idx) => (
                                <li key={idx} className=" leading-tight">
                                    {certificate.name && (
                                        <span>{certificate.name}</span>
                                    )}
                                    {certificate.authority && (
                                        <span className="ml-1">
                                            by{" "}
                                            <span className="font-semibold">
                                                {certificate.authority}
                                            </span>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            {formData.achievements && formData.achievements[0]?.name && (
                <div className="mt-2">
                    <div className="text-xl font-bold">Achievements</div>
                    <hr className="border-gray-600" />
                    <ul className="list-disc ml-8 mt-2">
                        {formData.achievements.map((ach, idx) => (
                            <li key={idx} className=" leading-tight">
                                {ach.name && <span>{ach.name}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Template1;
