import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { handleError } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Preview from "@/components/Preview";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { data } from "../data";

function Resume() {
    const [url, setUrl] = useState("");
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    const navigate = useNavigate();
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

    //Api
    const options = {
        method: "GET",
        url: "https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url",
        params: {
            url: url,
        },
        headers: {
            "x-rapidapi-key":
                "3e9a3935f1mshf8b8c5d3f9f4eb7p1e8cecjsn1ec21de6aef5",
            "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        },
    };

    const callApi = async () => {
        try {
            // const response = await axios.request(options);
            // const apiData = response.data;
            // console.log("api : ", apiData);

            console.log(data);
            const apiData = data;
            const mappedData = {
                firstName: apiData.firstName || "",
                lastName: apiData.lastName || "",
                email: apiData.email || "",
                mobile: apiData.mobile || "",
                geo: {
                    city: apiData.geo.city || "",
                    country: apiData.geo.country || "",
                },
                headline: apiData.headline || "",
                educations: [...apiData.educations] || [
                    educationFormDefaultValues,
                ],
                certifications: apiData.certifications.map((certificate) => ({
                    name: certificate.name || "",
                    authority: certificate.authority || "",
                })),
            };
            return mappedData;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const submit = async () => {
        console.log("url : " + url);
        try {
            let mappedData = await callApi();
            navigate("/resume/new", { state: { mappedData } });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-4/5 h-full mx-auto">
            <h1 className="text-3xl font-bold">
                Welcome back, {UserInfo?.name}!
            </h1>
            <hr className="mt-5 border" />
            <h3 className="text-md font-semibold my-4 text-gray-500">
                Data Import
            </h3>

            <Dialog>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        className="px-5 py-2.5 text-sm border border-pri-blue text-pri-blue hover:text-white hover:bg-pri-blue transition-all font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
                    >
                        <i className="text-lg mr-2 fa-brands fa-linkedin"></i>
                        LinkedIn Import
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="mb-2">
                            Import Data from LinkedIn
                        </DialogTitle>
                        <DialogDescription>
                            Please Enter LinkedIn Profile URL
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <input
                                id="link"
                                name="link"
                                className="w-full bg-transparent bg-gray-50 text-slate-700 text-sm border border-slate-200 rounded-md px-2 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                placeholder="https://www.linkedin.com/in/user-name"
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={submit}
                            >
                                Submit
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <h3 className="text-md font-semibold my-4 text-gray-500">
                My Resumes
            </h3>
            <div className="flex gap-4">
                {UserInfo?.resumes?.length > 0 &&
                    UserInfo.resumes.map((resume) => (
                        <Link to={`/resume/${resume._id}`} key={resume._id}>
                            <div className="w-52 h-72 bg-white border border-gray-200 rounded-lg shadow">
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
