const Task = require('../models/tasks.model.js')
const asyncWrapper = require('../middlewares/async.js');

const getAllTasks = asyncWrapper(async (req, res)=> {
        const tasks = await Task.find({});
        res.status(200).json({tasks});
});

const createTask = asyncWrapper( async (req, res)=> {
        const task = await Task.create(req.body);
        res.status(201).json({task});
});

const getTask = asyncWrapper(async (req, res)=> {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id:taskID});

    if(!task){
        return res.status(404).json({
            message:   `No Task with ID: ${taskID} was found`
        });
    }

    res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res)=> {
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
});

const deleteTask = asyncWrapper(async (req, res)=> {
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

});



module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}