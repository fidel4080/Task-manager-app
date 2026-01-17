const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: [20, 'name can not be more than 20 characters'],
            required: [true, 'name can not be empty']
        },

        completed: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model("Task", taskSchema);