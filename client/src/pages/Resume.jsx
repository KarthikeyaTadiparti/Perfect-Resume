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
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { data } from "../data";
import FadeLoader from "react-spinners/FadeLoader";
import { removeResumeInfo, setResumeInfo } from "@/slices/resumeSlice";

function Resume() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    const ResumeInfo = useSelector((state) => state.resume.ResumeInfo);
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
                console.log("User : ", result.user);
                dispatch(setCredentials(result.user));
                dispatch(removeResumeInfo());
                console.log("Removed ResumeInfo : ", ResumeInfo);
            } catch (error) {
                const errorMessage = error.response?.data?.message;
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
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("data :", data);
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

                        educations: apiData.educations.map((education) => ({
                            schoolName: education.schoolName || "",
                            start: { year: education.start.year || "" },
                            end: { year: education.end.year || "" },
                            fieldOfStudy: education.fieldOfStudy || "",
                            degree: education.degree || "",
                            grade: education.grade || "",
                        })),

                        experiences: apiData.position.map((experience) => ({
                            companyName: experience.companyName || "",
                            start: { year: experience.start.year || "" },
                            end: { year: experience.end.year || "" },
                            title: experience.title || "",
                            description: experience.description || "",
                            location:
                                experience.location
                                    .split(",")
                                    .slice(0, 2)
                                    .join(", ") || "",
                        })),

                        projects: apiData.projects.items.map((project) => ({
                            title: project.title || "",
                            description: project.description || "",
                            technologies: project.technologies || "",
                            links: project.links || "",
                        })),

                        certifications: apiData.certifications.map(
                            (certificate) => ({
                                name: certificate.name || "",
                                authority: certificate.authority || "",
                            })
                        ),
                    };
                    // return mappedData;
                    resolve(mappedData);
                }, 5000);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        console.log("url : " + url);

        setLoading(true);
        try {
            let mappedData = await callApi();
            dispatch(setResumeInfo(mappedData));
            navigate("/resume/new");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const renameResume = async (id) => {
        console.log("renaming : ", id);
    };

    const deleteResume = async (id) => {
        console.log("deleting : ", id);
        try {
            const response = await axios.delete(
                `http://localhost:3000/resume/${id}`,
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
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        Loading...
                                        <div className="scale-[0.4] -ml-2">
                                            <FadeLoader
                                                color="#000000"
                                                loading={loading}
                                            />
                                        </div>
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
                                        selectedTemplate="template1"
                                        scaleFactor={0.37}
                                    />
                                </div>

                                <div className="w-full p-4">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-lg font-bold tracking-tight text-gray-900">
                                            {resume.name}
                                        </h5>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <HiOutlineDotsHorizontal className="scale-[1.2]" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        renameResume(
                                                            resume._id
                                                        );
                                                    }}
                                                >
                                                    Rename
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteResume(
                                                            resume._id
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                        <i className="text-[60px] hover:text-pri-blue p-6 text-gray-200 fa-solid fa-plus"></i>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Resume;
