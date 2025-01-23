const ResumeModel = require("../models/ResumeModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

getResumes = async (req, res) => {
    const token = req.cookies["jwt"];
    if (token) {
        try {
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            let userId = decodedToken.id;
            // console.log(userId);
            let user = await UserModel.findById(userId).populate("resumes").select("-password");
            // console.log(user);
            return res.status(201).json({ message: "success", user: user });
        } catch (error) {
            console.log("Error verifying JWT:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    } else {
        console.log("Token not found");
        return res.status(401).json({ error: "Unauthorized. No token found." });
    }
};

createResume = async (req, res) => {
    let token = req.cookies["jwt"];
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.id;
            let data = req.body;

            //Time
            const utcDate = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            const istDate = new Date(utcDate.getTime() + istOffset);

            //new Resume
            let newResume = new ResumeModel({
                ...data,
                created_at: istDate,
                name: data.name || "Untitled Resume",
            });
            // console.log(newResume);
            await newResume.save();

            //updated User
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
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
    } else {
        console.log("Token not found");
        return res.status(401).json({ error: "Unauthorized. No token found." });
    }
};

module.exports = { createResume };
