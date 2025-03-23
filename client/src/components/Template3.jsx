import React from "react";

function Template3({ formData }) {
    return (
        <div className="font-sans font-normal tracking-tight">
            <div className="text-3xl font-bold text-pri-blue tracking-wide">
                {formData.firstName} {formData.lastName}
            </div>
            <div className="mt-2 flex text-sm divide-solid divide-x-[1px] divide-gray-900 items-center">
                {formData.mobile && (
                    <div className="pr-2">{formData.mobile}</div>
                )}
                {formData.email && <div className="px-2">{formData.email}</div>}
                {(formData.geo?.city || formData.geo?.country) && (
                    <div className="px-2">
                        {formData.geo?.city && formData.geo?.country
                            ? `${formData.geo.city}, ${formData.geo.country}`
                            : formData.geo.city || formData.geo.country}
                    </div>
                )}
            </div>

            {formData.headline && (
                <>
                    <hr className="mt-6 border-pri-blue border-2" />
                    <div className="flex items-start mt-4">
                        <div className="font-bold text-xl text-pri-blue w-36">
                            SUMMARY
                        </div>
                        <div className="flex-1 text-justify">{formData.headline}</div>
                    </div>
                </>
            )}

            {formData.educations &&
                (formData.educations[0]?.schoolName ||
                    formData.educations[0]?.fieldOfStudy ||
                    formData.educations[0]?.degree ||
                    formData.educations[0]?.grade ||
                    formData.educations[0]?.start.year ||
                    formData.educations[0]?.end.year) && (
                    <>
                        <hr className="mt-6 border-pri-blue border-1" />
                        <div className="flex items-start mt-4">
                            <div className="font-bold text-xl text-pri-blue w-36">
                                EDUCATION
                            </div>
                            <div className="flex-1">
                                {formData.educations.map((edu, idx) => (
                                    <div key={idx} className="mt-1">
                                        <div className="flex justify-between">
                                            {edu.schoolName && (
                                                <div className="font-bold">
                                                    {edu.schoolName}
                                                </div>
                                            )}
                                            {(edu.start.year ||
                                                edu.end.year) && (
                                                <div className="font-bold">
                                                    {edu.start.year} -{" "}
                                                    {edu.end.year}{" "}
                                                </div>
                                            )}
                                        </div>
                                        <ul className="list-disc ml-6">
                                            {(edu.degree ||
                                                edu.fieldOfStudy) && (
                                                <li className="">
                                                    {edu.degree} (
                                                    {edu.fieldOfStudy})
                                                </li>
                                            )}
                                            {edu.grade && (
                                                <li>
                                                    Percentage/CGPA : {edu.grade}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

            {formData.experiences &&
                (formData.experiences[0]?.companyName ||
                    formData.experiences[0]?.title ||
                    formData.experiences[0]?.location ||
                    formData.experiences[0]?.start.year ||
                    formData.experiences[0]?.end.year) && (
                    <>
                        <hr className="mt-6 border-pri-blue border-1" />
                        <div className="flex items-start mt-4">
                            <div className="font-bold text-xl text-pri-blue w-36">
                                WORK EXPERIENCE
                            </div>
                            <div className="flex-1">
                                {formData.experiences.map((ex, idx) => (
                                    <div
                                        key={idx}
                                        className="mt-1 leading-tight"
                                    >
                                        <div className="flex justify-between">
                                            <div className="flex font-bold divide-solid divide-x-[1px] divide-gray-900 justify-center items-center">
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

                                            <div className="flex font-bold divide-solid divide-x-[1px] divide-gray-900 justify-center items-center">
                                                {ex.location && (
                                                    <div className="px-2">
                                                        {ex.location}
                                                    </div>
                                                )}
                                                {(ex.start.year ||
                                                    ex.end.year) && (
                                                    <div className="px-2">
                                                        {ex.start.year} -{" "}
                                                        {ex.end.year}{" "}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {ex.description && (
                                            <ul className="ml-4 mt-2 px-2 text-justify leading-tight list-disc">
                                                <li className="text-justify">{ex.description}</li>
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

            {formData.projects &&
                (formData.projects[0]?.title ||
                    formData.projects[0]?.description ||
                    formData.projects[0]?.technologies ||
                    formData.projects[0]?.links) && (
                    <>
                        <hr className="mt-6 border-pri-blue border-1" />
                        <div className="flex items-start mt-4">
                            <div className="font-bold text-xl text-pri-blue w-36">
                                PROJECTS
                            </div>
                            <div className="flex-1">
                                {formData.projects.map((pr, idx) => (
                                    <div
                                        key={idx}
                                        className="mt-1 leading-tight"
                                    >
                                        <div className="flex justify-between">
                                            <div className="flex font-bold divide-solid divide-x-[1px] divide-gray-900 justify-center items-center">
                                                {pr.title && (
                                                    <div className="pr-2">
                                                        {pr.title}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex font-bold divide-solid divide-x-[1px] divide-gray-900 justify-center items-center">
                                                {pr.technologies && (
                                                    <div>
                                                        {pr.technologies}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <ul className="list-disc ml-6">
                                            {pr.links && (
                                                <li>
                                                    <b>Link : </b>
                                                    {pr.links}
                                                </li>
                                            )}
                                            {pr.description && (
                                                <li className="text-justify">{pr.description}</li>
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

            {formData.skills &&
                (formData.skills.languages ||
                    formData.skills.databases ||
                    formData.skills.tools ||
                    formData.skills.libraries ||
                    formData.skills.others) && (
                    <>
                        <hr className="mt-6 border-pri-blue border-1" />
                        <div className="flex items-start mt-4">
                            <div className="font-bold text-xl text-pri-blue w-36">
                                SKILLSETS
                            </div>
                            <div className="flex-1">
                                {formData.skills.languages && (
                                    <div>
                                        <span className="font-bold">
                                            Programming Languages :{" "}
                                        </span>{" "}
                                        {formData.skills.languages}
                                    </div>
                                )}
                                {formData.skills.libraries && (
                                    <div>
                                        <span className="font-bold">
                                            Libraries/Frameworks :{" "}
                                        </span>{" "}
                                        {formData.skills.libraries}
                                    </div>
                                )}
                                {formData.skills.tools && (
                                    <div>
                                        <span className="font-bold">
                                            Tools & Technologies :{" "}
                                        </span>{" "}
                                        {formData.skills.tools}
                                    </div>
                                )}
                                {formData.skills.databases && (
                                    <div>
                                        <span className="font-bold">
                                            Databases :{" "}
                                        </span>{" "}
                                        {formData.skills.databases}
                                    </div>
                                )}
                                {formData.skills.others && (
                                    <div>
                                        <span className="font-bold">
                                            Others :{" "}
                                        </span>
                                        {" " + formData.skills.others}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

            {formData.certifications &&
                (formData.certifications[0]?.name ||
                    formData.certifications[0]?.authority) && (
                    <>
                        <hr className="mt-6 border-pri-blue border-1" />
                        <div className="flex items-start mt-4">
                            <div className="font-bold text-xl text-pri-blue w-36">
                                CERTIFICATIONS
                            </div>
                            <ul className="list-disc ml-8">
                                {formData.certifications.map(
                                    (certificate, idx) => (
                                        <li
                                            key={idx}
                                            className=" leading-tight"
                                        >
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
                                    )
                                )}
                            </ul>
                        </div>
                    </>
                )}

            {formData.achievements && formData.achievements[0]?.name  && (
                    <>
                        <hr className="mt-6 border-pri-blue border-1" />
                        <div className="flex items-start mt-4">
                            <div className="font-bold text-xl text-pri-blue w-36">
                                ACHIEVEMENTS
                            </div>
                            <ul className="list-disc ml-8">
                        {formData.achievements.map((ach, idx) => (
                            <li key={idx} className=" leading-tight">
                                {ach.name && <span>{ach.name}</span>}
                            </li>
                        ))}
                    </ul>
                        </div>
                    </>
                )}
        </div>
    );
}

export default Template3;
