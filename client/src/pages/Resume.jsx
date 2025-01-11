import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleError } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Resume() {
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await axios.get("http://localhost:3000/resume", {
                    withCredentials: true, 
                });
                // console.log(result);
                setUser(result.data);
            } catch (error) {
                let result = error.response.data.message;
                console.log(result); 
                navigate("/auth/login");
                handleError(result)
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-4/5 h-full mx-auto">
            <br />
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
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
            {/* <div class="flex gap-4">
                <%if(user.documents && user.documents.length){%>
        <%user.documents.forEach((document) => { %>
        <div
            class="w-52 h-72 bg-white border border-gray-200 rounded-lg shadow"
        >
            <a href="#">
                <img
                    class="rounded-t-lg"
                    src="/Images/Template Sample Images/image.png"
                    alt=""
                />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5
                        class="mb-2 text-lg font-bold tracking-tight text-gray-900"
                    >
                        <%=document.name%>
                    </h5>
                </a>
                <p class="mb-3 text-sm font-normal text-gray-700">
                    Updated <%= new
                    Date(document.modified_at).toLocaleString("en-IN", { year:
                    "numeric", month: "short", day: "numeric", hour: "2-digit",
                    minute: "2-digit", }) %>
                </p>
            </div>
        </div>
        <%})%> <%}%> */}

            {/* <a href="/user/new">
                    <div class="w-52 h-72 flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow">
                        <i class="text-[60px] hover:text-pri-blue p-6 text-gray-200 fa-solid fa-plus"></i>
                    </div>
                </a>
            </div> */}
        </div>
    );
}

export default Resume;
