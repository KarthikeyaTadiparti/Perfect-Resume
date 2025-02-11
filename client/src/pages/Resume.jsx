import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { handleError } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Preview from "@/components/Preview";

function Resume() {
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get("http://localhost:3000/resume", {
                    withCredentials: true,
                });
                // console.log(response);
                let result = response.data;
                console.log(result.user);
                dispatch(setCredentials(result.user));
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.message ||
                    "An unknown error occurred";
                console.error("Error fetching data:", errorMessage);
                handleError(errorMessage);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-4/5 h-full mx-auto">
            <h1 className="text-3xl font-bold">
                Welcome back, {UserInfo?.name}!
            </h1>
            <hr className="mt-5 border" />
            <h3 className="text-md font-semibold my-4 text-gray-500">
                Data Import
            </h3>
            <form action="/home/resume/import" method="GET">
                <button
                    type="button"
                    className="px-5 py-2.5 text-sm border border-pri-blue text-pri-blue hover:text-white hover:bg-pri-blue transition-all font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
                >
                    <i className="text-lg mr-2 fa-brands fa-linkedin"></i>
                    LinkedIn Import
                </button>
            </form>

            <h3 className="text-md font-semibold my-4 text-gray-500">
                My Resumes
            </h3>
            <div className="flex gap-4">
                {UserInfo?.resumes?.length > 0 &&
                    UserInfo.resumes.map((resume) => (
                        <Link to={`/resume/${resume._id}`} key={resume._id}>
                            <div
                                
                                className="w-52 h-72 bg-white border border-gray-200 rounded-lg shadow"
                            >
                                <div className="w-full h-[70%] overflow-hidden">
                                    <Preview
                                        formData={resume}
                                        selectedTemplate="template1"
                                        scaleFactor={0.345}
                                    />
                                </div>

                                <div className="w-full p-3">
                                    <a href="#">
                                        <h5 className="text-lg font-bold tracking-tight text-gray-900">
                                            {resume.name}
                                        </h5>
                                    </a>
                                    <p className="text-sm font-normal text-gray-700">
                                        Updated{" "}
                                        {new Date(
                                            resume.updated_at
                                        ).toLocaleString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}

                <Link to="/resume/new">
                    <div className="w-52 h-72 flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow">
                        <i className="text-[60px] hover:text-pri-blue p-6 text-gray-200 fa-solid fa-plus"></i>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Resume;
