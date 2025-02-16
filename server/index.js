const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./models/db");
const authRouter = require("./routes/authRouter");
const resumeRouter = require("./routes/resumeRouter");

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/resume",resumeRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening to port 3000");
});
