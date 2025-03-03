import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { handleError, handleSuccess } from "../lib/utils";
import axios from "axios";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UserInfo = useSelector((state) => state.auth.UserInfo);

    const handleChanges = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsSubmitting(true);
            let response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(response);
            // console.log(response.data);
            let result = response.data;
            dispatch(setCredentials(result.user));

            if (result.success) {
                handleSuccess(result.message);
                navigate("/resume");
            }
        } catch (error) {
            console.log(error);
            let msg = error?.response?.data?.message;
            handleError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-screen h-full flex justify-center items-center bg-back">
            {isSubmitting && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-60">
                    <div className="spinner"></div>
                </div>
            )}
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
                        to="/auth/login"
                        className="text-pri-blue hover:underline hover:decoration-pri-blue"
                    >
                        Forgot password?
                    </Link>
                </div>

                <FormButton name="Log In" isSubmitting={isSubmitting} />
                <hr />

                <p className="mt-4 text-center">
                    Don't have an account?
                    <Link
                        to="/auth/signup"
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
