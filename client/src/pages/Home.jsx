import React from "react";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className=" w-4/5 h-full mx-auto flex ">
            <div className="w-3/5">
                <h1 className="text-4xl font-black tracking-wider leading-relaxed mt-28">
                    Land the Job with Resumes
                    <br />
                    That work for You.
                </h1>
                <p className="text-lg mt-5 tracking-wide leading-relaxed font-medium">
                    Your resume is the key to your career. With “Perfect
                    Resume”,
                    <br />
                    you can create stunning, industry-specific resumes in just a
                    few steps. <br />
                    Don't just apply - impress!
                </p>
                <button className="text-white bg-pri-blue hover:bg-dark-pri-blue font-medium rounded-lg text-sm px-6 py-3 text-center my-6">
                    <Link
                        to="/resume"
                    >
                        Create Resume
                    </Link>
                </button>
            </div>
            <div>
                <img
                    src="/images/resume-illustration.svg"
                    loading="eager"
                    alt="resume-illustration"
                    className="h-[90%] float-right"
                />
            </div>
        </div>
    );
}

export default Home;
