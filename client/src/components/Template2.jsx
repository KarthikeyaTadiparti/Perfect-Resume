import React from "react";

function Template2({ formData }) {
    return (
        <div className="font-serif p-6 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center text-2xl font-bold">
                {formData.firstName} {formData.lastName}
            </div>
            <div className="text-center text-sm mt-1 flex justify-center gap-4">
                {formData.mobile && <span>📞 {formData.mobile}</span>}
                {formData.email && <span>✉️ {formData.email}</span>}
                {formData.geo?.city || formData.geo?.country ? (
                    <span>📍 {formData.geo.city}, {formData.geo.country}</span>
                ) : null}
            </div>
            <hr className="my-4 border-gray-400" />
            
            {/* Career Objective */}
            {formData.headline && (
                <div>
                    <h2 className="text-lg font-semibold">Career Objective</h2>
                    <hr className="border-gray-400" />
                    <p className="text-sm mt-2 text-justify">{formData.headline}</p>
                </div>
            )}

            {/* Education Section */}
            {formData.educations && formData.educations.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Education</h2>
                    <hr className="border-gray-400" />
                    {formData.educations.map((edu, idx) => (
                        <div key={idx} className="mt-2 text-sm">
                            <strong>{edu.schoolName}</strong> ({edu.start.year} - {edu.end.year})<br />
                            {edu.degree} ({edu.fieldOfStudy}), {edu.grade && `Percentage: ${edu.grade}%`}
                        </div>
                    ))}
                </div>
            )}
            
            {/* Experience Section */}
            {formData.experiences && formData.experiences.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Experience</h2>
                    <hr className="border-gray-400" />
                    {formData.experiences.map((exp, idx) => (
                        <div key={idx} className="mt-2 text-sm">
                            <strong>{exp.companyName}</strong> ({exp.location}) - {exp.title} ({exp.start.year} - {exp.end.year})
                            {exp.description && <p className="mt-1 text-xs text-justify">{exp.description}</p>}
                        </div>
                    ))}
                </div>
            )}
            
            {/* Projects Section */}
            {formData.projects && formData.projects.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Projects</h2>
                    <hr className="border-gray-400" />
                    {formData.projects.map((proj, idx) => (
                        <div key={idx} className="mt-2 text-sm">
                            <strong>{proj.title}</strong> - {proj.technologies}<br />
                            {proj.links && <p className="text-blue-600">🔗 {proj.links}</p>}
                            <p className="mt-1 text-xs text-justify">{proj.description}</p>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Certifications Section */}
            {formData.certifications && formData.certifications.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Certifications</h2>
                    <hr className="border-gray-400" />
                    {formData.certifications.map((cert, idx) => (
                        <div key={idx} className="mt-2 text-sm">
                            {cert.name} {cert.authority && <span>by <strong>{cert.authority}</strong></span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Template2;
