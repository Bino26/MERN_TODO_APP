const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    userId: { type: String },
    todo: {
        type: String,
        minlength: [3, 'Todo must be at least 3 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("todoLists", todoListSchema);