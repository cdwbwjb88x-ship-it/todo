const express = require('express');
const router = express.Router();
const {getAllTasks,addTask,getTask,deleteTask,editTask} = require('../controller/tasks_C');
const {isLoggedIn} = require('../middelware/auth_MID');
const {valuesToAdd,isValidId,valuesToEdit} = require('../middelware/tasks_MID');


router.get('/',isLoggedIn,getAllTasks);
router.post('/',isLoggedIn,valuesToAdd,addTask);
router.get('/:id',isLoggedIn,isValidId,getTask);
router.delete('/:id',isLoggedIn,isValidId,deleteTask);
router.patch('/:id',isLoggedIn,isValidId,valuesToEdit,editTask);


module.exports = router;