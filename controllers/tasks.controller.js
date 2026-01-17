const Task = require('../models/tasks.model.js')

const getAllTasks = async (req, res)=> {
    try {
        const tasks = await Task.find({});
        res.status(200).json({tasks});

    } catch (error) {
        console.error("Get All tasks error:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });

    }
}

const createTask = async (req, res)=> {

    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});

    } catch (error) {
        console.error("Create task error:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
    
}

const getTask = async (req, res)=> {
try {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id:taskID});

    if(!task){
        return res.status(404).json({
            message:   `No Task with ID: ${taskID} was found`
        });
    }

    res.status(200).json({task});

} catch (error) {
    console.error("Get task error:", error.message);
    res.status(500).json({
    message: "Internal server error"
    });

}
}

const updateTask = async (req, res)=> {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndUpdate(
            {_id: taskID},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!task){
            return res.status(404).json({
                message: 'no task with that id was found'
            });
        }

        res.status(200).json({task});
    } catch (error) {
        console.error("Update task error:", error.message);
        res.status(500).json({
        message: "Internal server error"
    });
}
}

const deleteTask = async (req, res)=> {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});

        if(!task){
            res.status(404).json({
                message: `No task with id: ${taskID} was found`
            });
        }

        res.status(200).json({
            message: 'Task deleted successfully!'
        });

    } catch (error) {
        console.error("Delete task error:", error.message);
        res.status(500).json({
        message: "Internal server error"
        });
    }
}



module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}