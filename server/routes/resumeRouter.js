const express = require("express");
const router = express.Router();
const {createResume} = require("../controllers/resumeController");

router.get("/", getResumes);
router.post("/new", createResume);

module.exports = router;