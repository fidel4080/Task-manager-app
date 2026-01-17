const express = require('express');
const router = express.Router();
const {getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask 
} = require('../controllers/tasks.controller.js');


router.route('/').get(getAllTasks).post(createTask);
router.route(':id').get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;