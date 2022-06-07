const express = require('express');
const router = express.Router()
const Workspace = require("../workspace/workspace")
const Event = require("../events/events")
const Course = require("../courses/courses")

router.route("/workspace").post(Workspace.bookWorkspace)
router.route("/event").post(Event.bookEvent)
router.route("/course").post(Course.registerCourse)
module.exports = router

