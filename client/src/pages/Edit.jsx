import axios from "axios";
import React, { useEffect } from "react";
import Create from "./Create";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResumeInfo } from "@/slices/resumeSlice";

function Edit() {
    let { id } = useParams();
    console.log("id : " + id);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:3000/resume/${id}`,
                {
                    withCredentials: true,
                }
            );
            const result = response.data;
            const resume = result.resume;
            console.log(resume);
            dispatch(setResumeInfo(resume));
        };
        fetchData();
    });
    return <Create />;
}

export default Edit;
