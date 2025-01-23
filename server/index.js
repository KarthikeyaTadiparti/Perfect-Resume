const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./models/db");
const authRouter = require("./routes/authRouter");
const resumeRouter = require("./routes/resumeRouter");
const { ensureAuthentication } = require("./middleware/authValidation");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/resume",resumeRouter);
// app.get("/resume", (req, res) => {
//     let user = req.user;
//     res.json(user);
// });

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});
