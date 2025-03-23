import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
function Template4({ formData }) {
    return (
        <div className="font-roboto font-normal p-2">
            <div className="text-4xl font-bold text-center tracking-widest">
                {formData.firstName} {formData.lastName}
                <hr className="mt-6 border-gray-400 border-1" />
            </div>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
                <div className="flex flex-col">
                    {(formData.mobile ||
                        formData.email ||
                        formData.geo.city ||
                        formData.geo.country) && (
                        <div className="mt-2 flex flex-col">
                            <div className="text-lg font-bold tracking-[4px] my-4">
                                CONTACT
                            </div>
                            {formData.mobile && (
                                <div className="flex gap-2 items-center">
                                    <FaPhoneAlt />
                                    {formData.mobile}
                                </div>
                            )}
                            {formData.email && (
                                <div className="flex gap-2 items-center">
                                    <IoIosMail />
                                    {formData.email}
                                </div>
                            )}
                            {(formData.geo?.city || formData.geo?.country) && (
                                <div className="flex gap-2 items-center">
                                    <FaLocationDot />
                                    {formData.geo?.city && formData.geo?.country
                                        ? `${formData.geo.city}, ${formData.geo.country}`
                                        : formData.geo.city ||
                                          formData.geo.country}
                                </div>
                            )}
                        </div>
                    )}

                    {formData.educations &&
                        (formData.educations[0]?.schoolName ||
                            formData.educations[0]?.fieldOfStudy ||
                            formData.educations[0]?.degree ||
                            formData.educations[0]?.grade ||
                            formData.educations[0]?.start.year ||
                            formData.educations[0]?.end.year) && (
                            <>
                                <div className="flex flex-col items-start mt-4">
                                    <div className="my-4 font-bold text-lg tracking-[4px]">
                                        EDUCATION
                                    </div>
                                    <div>
                                        {formData.educations.map((edu, idx) => (
                                            <div key={idx} className="mt-1">
                                                <div className="flex justify-between">
                                                    {edu.schoolName && (
                                                        <div className="font-medium">
                                                            {edu.schoolName}
                                                        </div>
                                                    )}
                                                </div>
                                                <ul className="list-disc ml-6">
                                                    {(edu.degree ||
                                                        edu.fieldOfStudy) && (
                                                        <li>
                                                            {edu.degree} (
                                                            {edu.fieldOfStudy})
                                                        </li>
                                                    )}
                                                    {edu.grade && (
                                                        <li>
                                                            Percentage/CGPA :{" "}
                                                            {edu.grade}
                                                        </li>
                                                    )}
                                                    {(edu.start.year ||
                                                        edu.end.year) && (
                                                        <li className="">
                                                            {edu.start.year} -{" "}
                                                            {edu.end.year}{" "}
                                                        </li>
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
                            <div className="flex flex-col items-start mt-4">
                                <div className="my-4 font-bold text-lg tracking-[4px]">
                                    SKILLSETS
                                </div>

                                <div>
                                    {formData.skills.languages && (
                                        <div className="flex flex-col">
                                            <span className="font-semi">
                                                Programming Languages :
                                            </span>
                                            {formData.skills.languages}
                                        </div>
                                    )}
                                    {formData.skills.libraries && (
                                        <div className="flex flex-col">
                                            <span className="font-semi">
                                                Libraries/Frameworks :
                                            </span>
                                            {formData.skills.libraries}
                                        </div>
                                    )}
                                    {formData.skills.tools && (
                                        <div className="flex flex-col">
                                            <span className="font-semi">
                                                Tools & Technologies :
                                            </span>
                                            {formData.skills.tools}
                                        </div>
                                    )}
                                    {formData.skills.databases && (
                                        <div className="flex flex-col">
                                            <span className="font-semi">
                                                Databases :
                                            </span>
                                            {formData.skills.databases}
                                        </div>
                                    )}
                                    {formData.skills.others && (
                                        <div>
                                            <span className="font-semi">
                                                Others :{" "}
                                            </span>
                                            {" " + formData.skills.others}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    {formData.achievements &&
                        formData.achievements[0]?.name && (
                            <div className="flex flex-col items-start mt-4">
                                <div className="my-4 font-bold text-lg tracking-[4px]">
                                    ACHIEVEMENTS
                                </div>

                                <ul className="list-disc ml-4">
                                    {formData.achievements.map((ach, idx) => (
                                        <li key={idx}>
                                            {ach.name && (
                                                <span>{ach.name}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </div>

                <div className="flex flex-col">
                    {formData.headline && (
                        <div className="mt-2 flex flex-col">
                            <div className="text-lg font-bold tracking-[4px] my-4">
                                ABOUT ME
                            </div>
                            <div className="text-justify">
                                {formData.headline}
                            </div>
                        </div>
                    )}
                    {formData.experiences &&
                        (formData.experiences[0]?.companyName ||
                            formData.experiences[0]?.title ||
                            formData.experiences[0]?.location ||
                            formData.experiences[0]?.start.year ||
                            formData.experiences[0]?.end.year) && (
                            <div className="flex flex-col items-start mt-4">
                                <div className="my-4 font-bold text-lg tracking-[4px]">
                                    WORK EXPERIENCE
                                </div>
                                <div className="flex-1">
                                    {formData.experiences.map((ex, idx) => (
                                        <div key={idx} className="mt-1">
                                            <div className="">
                                                {(ex.companyName ||
                                                    ex.location) && (
                                                    <div className="pr-2 font-bold">
                                                        {ex.companyName} -{" "}
                                                        {ex.location}
                                                    </div>
                                                )}

                                                {(ex.title ||
                                                    ex.start.year ||
                                                    ex.end.year) && (
                                                    <div className="pr-2">
                                                        {ex.title} (
                                                        {ex.start.year} -{" "}
                                                        {ex.end.year} )
                                                    </div>
                                                )}
                                            </div>

                                            {ex.description && (
                                                <ul className="ml-4 mt-2 px-2 text-justify leading-tight list-disc">
                                                    <li className="text-justify">
                                                        {ex.description}
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    {formData.projects &&
                        (formData.projects[0]?.title ||
                            formData.projects[0]?.description ||
                            formData.projects[0]?.technologies ||
                            formData.projects[0]?.links) && (
                            <div className="flex flex-col items-start mt-4">
                                <div className="my-4 font-bold text-lg tracking-[4px]">
                                    PROJECTS
                                </div>

                                <div>
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
                                                    <li className="text-justify">
                                                        {pr.description}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    {formData.certifications &&
                        (formData.certifications[0]?.name ||
                            formData.certifications[0]?.authority) && (
                            <div className="flex flex-col items-start mt-4">
                                <div className="my-4 font-bold text-lg tracking-[4px]">
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
                                                    <span>
                                                        {certificate.name}
                                                    </span>
                                                )}
                                                {certificate.authority && (
                                                    <span className="ml-1">
                                                        by{" "}
                                                        <span className="font-semibold">
                                                            {
                                                                certificate.authority
                                                            }
                                                        </span>
                                                    </span>
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default Template4;
