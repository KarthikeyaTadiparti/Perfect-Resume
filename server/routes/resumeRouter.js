const express = require("express");
const router = express.Router();
const {createResume,getResumes} = require("../controllers/resumeController");
const { ensureAuthentication } = require("../middleware/authValidation");

router.get("/", ensureAuthentication,getResumes);
router.post("/new", ensureAuthentication,createResume);

module.exports = router;