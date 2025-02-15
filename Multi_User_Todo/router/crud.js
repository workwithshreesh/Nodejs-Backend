const express = require("express")
const {CreateProfile, CreateTodoTask, 
    GetTaskData, DeleteTodoTask} = require("../controller/crud");

router = express.Router();

router.post("/create-profile", CreateProfile);
router.post("/create-task",CreateTodoTask);
router.get("/Get-All-User/:id", GetTaskData);
router.delete("/Delete-Task/:id",DeleteTodoTask);

module.exports = router