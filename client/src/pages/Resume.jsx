import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { handleError, handleSuccess } from "../lib/utils";
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
} from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { data } from "../data";
import { removeResumeInfo, setResumeInfo } from "@/slices/resumeSlice";
import { FaPlus } from "react-icons/fa6";

function Resume() {
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingResume, setIsFetchingResume] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    const ResumeInfo = useSelector((state) => state.resume.ResumeInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetchingResume(true);
                let response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/resume`,
                    {
                        withCredentials: true,
                    }
                );
                console.log(response);
                let result = response.data;
                console.log("User : ", result.user);
                dispatch(setCredentials(result.user));
                dispatch(removeResumeInfo());
                console.log("Removed ResumeInfo : ", ResumeInfo);
            } catch (error) {
                const errorMessage = error.response?.data?.message;
                console.error("Error fetching data:", errorMessage);
                handleError(errorMessage);
            } finally {
                setIsFetchingResume(false);
            }
        };
        fetchData();
    }, [dispatch]);

    //Api
    const options = {
        method: "GET",
        url: import.meta.env.VITE_LINKEDIN_API_URL,
        params: {
            url: url,
        },
        headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        },
    };

    const callApi = async () => {
        try {
            const response = await axios.request(options);
            console.log(response);
            const apiData = response.data;
            console.log("api : ", apiData);
            if (apiData.id) {
                // return new Promise((resolve) => {
                //     setTimeout(() => {
                // console.log("data :", data);
                // const apiData = data;
                const others = "";
                const mappedData = {
                    firstName: apiData.firstName || "",
                    lastName: apiData.lastName || "",
                    email: apiData.email || "",
                    mobile: apiData.mobile || "",
                    geo: {
                        city: apiData.geo?.city || "",
                        country: apiData.geo?.country || "",
                    },
                    headline: apiData.headline || "",

                    educations:
                        apiData.educations?.map((education) => ({
                            schoolName: education.schoolName || "",
                            start: { year: education.start?.year || "" },
                            end: { year: education.end?.year || "" },
                            fieldOfStudy: education.fieldOfStudy || "",
                            degree: education.degree || "",
                            grade: education.grade || "",
                        })) || [],

                    experiences:
                        apiData.position?.map((experience) => ({
                            companyName: experience.companyName || "",
                            start: { year: experience.start?.year || "" },
                            end: { year: experience.end?.year || "" },
                            title: experience.title || "",
                            description: experience.description || "",
                            location: experience.location
                                ? experience.location
                                      .split(",")
                                      .slice(0, 2)
                                      .join(", ")
                                : "",
                        })) || [],

                    projects:
                        apiData.projects?.items?.map((project) => ({
                            title: project.title || "",
                            description: project.description || "",
                            technologies: project.technologies || "",
                            links: project.links || "",
                        })) || [],

                    certifications:
                        apiData.certifications?.map((certificate) => ({
                            name: certificate.name || "",
                            authority: certificate.authority || "",
                        })) || [],

                    skills: {
                        others:
                            (others || "") +
                            (others && apiData.skills?.length ? ", " : "") +
                            (apiData.skills
                                ?.map((skill) => skill.name)
                                .join(", ") || ""),
                    },
                };

                return mappedData;
                //     resolve(mappedData);
                // }, 5000);
                // });
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        console.log("url : " + url);

        setIsSubmitting(true);
        try {
            let mappedData = await callApi();
            if (mappedData) {
                dispatch(setResumeInfo(mappedData));
                navigate("/resume/new");
            } else return handleError("Invalid LinkedIn Profile Url");
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteResume = async (id) => {
        setIsDeleting(true);
        console.log("deleting : ", id);
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/resume/${id}`,
                {
                    withCredentials: true,
                }
            );
            const result = response.data;
            // console.log(result);
            handleSuccess(result.message);
            dispatch(setCredentials(result.user));
            console.log(result.user);
        } catch (error) {
            let msg = error?.response?.data?.message;
            handleError(msg);
            console.log("Unable to delete resume : ", error);
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <div className="w-4/5 h-full mx-auto">
            {(isFetchingResume || isDeleting) && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-60">
                    <div className="spinner"></div>
                </div>
            )}

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

                    <form onSubmit={submit}>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <input
                                    id="link"
                                    name="link"
                                    className="w-full bg-transparent bg-gray-50 text-slate-700 text-sm border border-slate-200 rounded-md px-2 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                    placeholder="https://www.linkedin.com/in/user-name"
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <DialogFooter className="sm:justify-start mt-4">
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <div className="loader"></div>
                                    </span>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <h3 className="text-md font-semibold my-4 text-gray-500">
                My Resumes
            </h3>
            <div className="w-full flex flex-wrap gap-5">
                {UserInfo?.resumes?.length > 0 &&
                    UserInfo.resumes.map((resume) => (
                        <Link to={`/resume/${resume._id}`} key={resume._id}>
                            <div className="w-56 h-72 bg-white border border-gray-200 rounded-lg shadow hover:scale-[1.02] transition-all overflow-hidden">
                                <div className="w-full h-[70%] overflow-hidden">
                                    <Preview
                                        formData={resume}
                                        scaleFactor={0.28}
                                        className={"overflow-clip"}
                                    />
                                </div>

                                <div className="w-full p-4">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-lg font-bold tracking-tight text-gray-900">
                                            {resume.name}
                                        </h5>
                                        <button
                                            className="bg-gray-200 p-1 rounded-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                deleteResume(resume._id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <p className="text-xs font-normal text-gray-700">
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
                    <div className="w-56 h-72 flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow hover:scale-[1.02] transition-all">
                        <FaPlus
                            style={{ fontSize: "60px" }}
                            className="text-pri-blue"
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Resume;
