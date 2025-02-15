const express = require("express");
const router = express.Router();
const {createResume,getResumes,editResume,deleteResume} = require("../controllers/resumeController");
const { ensureAuthentication } = require("../middleware/authValidation");

router.get("/", ensureAuthentication,getResumes);
router.post("/new", ensureAuthentication,createResume);
router.get("/:id",ensureAuthentication,editResume);
router.delete("/:id",ensureAuthentication,deleteResume);

module.exports = router;