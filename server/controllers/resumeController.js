const { json } = require("body-parser");
const ResumeModel = require("../models/ResumeModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

getResumes = async (req, res) => {
    try {
        let id = req.user["id"];
        let user = await UserModel.findById(id)
            .populate("resumes")
            .select("-password");
        // console.log(user);
        return res.status(201).json({ message: "success", user: user });
    } catch (error) {
        console.log("Error verifying JWT:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

createResume = async (req, res) => {
    try {
        let id = req.user["id"];
        // console.log(id);
        let data = req.body;
        // console.log(data);
        const istDate = new Date();

        let newResume = new ResumeModel({
            ...data,
            updated_at: istDate,
            name: data.name || "Untitled Resume",
        });
        // console.log(newResume);
        await newResume.save();

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $push: { resumes: newResume } },
            { new: true }
        ).select("-password");
        console.log(updatedUser);

        return res.status(201).json({
            message: "Resume created successfully.",
            user: updatedUser,
        });
    } catch (error) {
        console.log("Error verifying JWT:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

editResume = async (req, res) => {
    let id = req.params.id;
    // console.log(id);
    try {
        let resume = await ResumeModel.findById(id);
        console.log("Resume Info : ", resume);
        return res.status(201).json({
            resume: resume,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const deleteResume = async (req, res) => {
    try {
        let id = req.params.id;
        // console.log("Resume ID:", id);

        const userId = req.user["id"];
        // console.log("User ID:", userId);

        const resume = await ResumeModel.findById(id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        await ResumeModel.findByIdAndDelete(id);

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { resumes: id } },
            { new: true }
        )
            .populate("resumes")
            .select("-password");

        // console.log("Updated User:", updatedUser);

        return res.status(200).json({
            message: "Resume deleted successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error deleting resume:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createResume, getResumes, editResume, deleteResume };
