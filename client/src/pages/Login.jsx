import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/utils";
import axios from "axios";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChanges = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await axios.post(
                "http://localhost:3000/auth/login",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            // console.log(response.data);
            let result = response.data;
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => {
                    navigate("/resume");
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            let msg = error.response.data.message;
            handleError(msg);
        }
    };

    return (
        <div className="w-screen h-full flex justify-center items-center bg-background">
            <form
                onSubmit={handleSubmit}
                className="w-1/4 border border-gray-200 mx-auto px-6 py-8 rounded-lg shadow-md bg-white"
            >
                <h1 className="font-bold text-3xl text-center mb-6">Log In</h1>
                <FormInput
                    name="email"
                    value={formData.email}
                    labelName="Email"
                    handleChanges={handleChanges}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={formData.password}
                    labelName="Password"
                    handleChanges={handleChanges}
                />
                <div className="mb-4">
                    <Link
                        to="#"
                        className="text-pri-blue hover:underline hover:decoration-pri-blue"
                    >
                        Forgot password?
                    </Link>
                </div>

                <FormButton name="Log In"/>
                <hr />

                <p className="mt-4 text-center">
                    Don't have an account?
                    <Link
                        to="/user/signup"
                        className="mx-1 text-pri-blue hover:underline hover:decoration-pri-blue"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
