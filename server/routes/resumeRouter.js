const express = require("express");
const router = express.Router();
const {createResume,getResumes,editResume} = require("../controllers/resumeController");
const { ensureAuthentication } = require("../middleware/authValidation");

router.get("/", ensureAuthentication,getResumes);
router.post("/new", ensureAuthentication,createResume);
router.get("/:id",ensureAuthentication,editResume);

module.exports = router;