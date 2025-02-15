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
        const date = new Date();

        let newResume = new ResumeModel({
            ...data,
            updated_at: date,
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
        // console.log("Resume Info : ", resume);
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

const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const date = new Date();

        // console.log("data : ", data);
        // console.log("resume id : ", id);

        const updatedResume = await ResumeModel.findByIdAndUpdate(
            id,
            { ...data, updated_at: date },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ error: "Resume not found" });
        }

        console.log(updatedResume);
        res.status(200).json({
            message: "Resume updated successfully!",
            resume: updatedResume,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    createResume,
    getResumes,
    editResume,
    deleteResume,
    updateResume,
};
