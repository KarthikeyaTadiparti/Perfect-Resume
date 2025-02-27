import React from "react";

function AboutUs() {
    return (
        <div className="w-screen h-full flex flex-col justify-center items-center bg-back ">
            <h1 className="text-center text-4xl font-bold mb-4">About Us</h1>
            <div className="flex w-1/2 px-12 py-12 rounded-lg border-2 shadow-sm">
                <ul className="list-disc ml-4 text-justify">
                    <li>
                        Welcome to{" "}
                        <span className="font-bold">Perfect Resume</span>, your
                        ultimate solution for building{" "}
                        <span className="font-bold">
                            professional, ATS-friendly resumes
                        </span>{" "}
                        with ease. We understand that crafting a perfect resume
                        can be overwhelming, so we've designed a
                        <span className="font-bold">
                            smart, user-friendly platform
                        </span>{" "}
                        that simplifies the process.
                    </li>
                    <li>
                        With <span className="font-bold">Perfect Resume</span>,
                        you can create a
                        <span className="font-bold">standout resume</span> in
                        minutes using
                        <span className="font-bold">
                            customizable templates
                        </span>{" "}
                        tailored to different industries. Our platform helps you{" "}
                        <span className="font-bold">
                            highlight your skills and experience
                        </span>{" "}
                        effectively, ensuring your resume meets{" "}
                        <span className="font-bold">industry standards</span>{" "}
                        and impresses recruiters.
                    </li>
                    <li>
                        We are a passionate{" "}
                        <span className="font-bold">team of four</span>{" "}
                        dedicated to making the
                        <span className="font-bold">
                            resume-building process seamless and efficient
                        </span>
                        . Whether you're a{" "}
                        <span className="font-bold">fresh graduate</span> or an{" "}
                        <span className="font-bold">
                            experienced professional
                        </span>
                        , <span className="font-bold">Perfect Resume</span>{" "}
                        empowers you to{" "}
                        <span className="font-bold">
                            present your best self
                        </span>{" "}
                        and land your
                        <span className="font-bold">dream job</span>.
                    </li>
                    <li className="font-bold">
                        Start building your perfect resume today!
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AboutUs;
