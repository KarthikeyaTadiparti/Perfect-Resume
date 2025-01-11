const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        const jwtToken = jwt.sign(
            { _id: newUser._id, name: newUser.name, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        // console.log(jwtToken);
        res.cookie("jwtToken", jwtToken, {
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
        });
        res.status(201).json({ message: "Signup successfully", success: true });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res
                .status(403)
                .json({ message: "User does not exists", success: false });
        }

        let isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res
                .status(403)
                .json({ message: "Wrong email or password", success: false });
        }

        const jwtToken = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        // console.log(jwtToken);
        res.cookie("jwtToken", jwtToken, {
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
        });
        
        res.status(201).json({
            message: "Login successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
module.exports = { signup, login };
