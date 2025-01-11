import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../utils/utils";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChanges = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);

        try {
            let response = await axios.post(
                "http://localhost:3000/auth/signup",
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
                className="w-1/4 shadow-md border border-gray-200 mx-auto px-6 py-4 rounded-lg bg-white"
            >
                <h1 className="font-bold text-3xl text-center mb-6">Sign Up</h1>

                <FormInput
                    name="name"
                    value={formData.name}
                    labelName="Full Name"
                    handleChanges={handleChanges}
                />
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

                <FormButton name="Sign Up" />
                <hr />
                <p className="mt-5 text-center">
                    Have an account?
                    <Link
                        to="/auth/login"
                        className="mx-1 text-pri-blue hover:underline hover:decoration-pri-blue"
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
