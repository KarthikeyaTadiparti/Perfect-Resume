import axios from "axios";
import React, { useEffect, useState } from "react";
import Create from "./Create";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setResumeInfo } from "@/slices/resumeSlice";

function Edit() {
    let { id } = useParams();
    console.log("id : " + id);
    const dispatch = useDispatch();
    const [isFetchingResume, setIsFetchingResume] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetchingResume(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/resume/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                const result = response.data;
                const resume = result.resume;
                console.log(resume);
                dispatch(setResumeInfo(resume));
            } catch (error) {
                console.error("Error fetching resume:", error);
            } finally {
                setIsFetchingResume(false);
            }
        };
        fetchData();
    }, [id, dispatch]);

    if (isFetchingResume) {
        return (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-60">
                <div className="spinner"></div>
            </div>
        );
    }

    return <Create />;
}

export default Edit;
