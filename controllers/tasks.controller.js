const Task = require('../models/tasks.model.js')

const getAllTasks = (req, res)=> {
    res.send('All tasks');
}

const createTask = async (req, res)=> {

    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});

    } catch (error) {
        console.error("Create task error:", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
    
}

const getTask = (req, res)=> {

}

const updateTask = (req, res)=> {

}

const deleteTask = (req, res)=> {

}



module.exports = 
{
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}