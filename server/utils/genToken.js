const jwt = require("jsonwebtoken");

function genToken(res, id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_EN !== "development",
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    // return token;
};

module.exports = genToken;
