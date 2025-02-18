const Joi = require("joi");
const jwt = require("jsonwebtoken");

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    // console.log(error.details[0].message);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    // console.log(error.details[0].message);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const ensureAuthentication = (req, res, next) => {
    let jwtToken = req.cookies.jwt;
    // console.log(jwtToken);
    if (!jwtToken)
        return res
            .status(401)
            .json({ message: "User must me logged in", success: false });

    try {
        let user = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = user;
        // console.log(req.user);
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Invalid token", success: false });
    }
};

module.exports = { signupValidation, loginValidation, ensureAuthentication };
