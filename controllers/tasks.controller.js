const Task = require('../models/tasks.model.js')
const asyncWrapper = require('../middlewares/async.js');
const {createCustomError} = require('../errors/custom-error.js');

const getAllTasks = asyncWrapper(async (req, res)=> {
        const tasks = await Task.find({});
        res.status(200).json({tasks});
});

const createTask = asyncWrapper( async (req, res, next)=> {
        const task = await Task.create(req.body);
        res.status(201).json({task});
});

const getTask = asyncWrapper(async (req, res, next)=> {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id:taskID});

    if(!task){
        return next(createCustomError(`No Task with ID: ${taskID} was found`, 404));
    }

    res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res, next)=> {
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
            return next(createCustomError(`No task with ID: ${taskID} was found`, 404));
        }

        res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res, next)=> {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});

        if(!task){
            return next(createCustomError(`No task with id: ${taskID} was found`, 404));
        }

        res.status(200).json({
            msg: 'Task deleted successfully!'
        });

});



module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}