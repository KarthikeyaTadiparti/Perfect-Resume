const ResumeModel = require("../models/ResumeModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

getResumes = async (req, res) => {
    try {
        let id = req.user["id"];
        let user = await UserModel.findById(id)
            .populate("resumes")
            .select("-password");
        console.log(user);
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

editResume = async (req,res)=>{
    let id = req.params.id;
    res.send(id);
}

module.exports = { createResume, getResumes,editResume };
