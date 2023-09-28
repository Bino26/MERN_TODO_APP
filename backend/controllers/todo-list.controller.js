const todoListModel = require('../model/todo-list.model.js');
const userModel = require('../model/user.model.js');

// post todo
exports.addtodo = async (req, res) => {
    const { userId } = req.user;
    const { todo, completed } = req.body;

    try {
        const todoItem = new todoListModel({
            userId,
            todo,
            completed
        });
        await todoItem.save();

        return res.status(200).json({
            success: true,
            message: 'Todo added successfully',
            todo: todoItem,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// update todo status
exports.updateTodoStatus = async (req, res) => {
    const { todoId, completed } = req.body;

    try {
        const todoItem = await todoListModel.findById(todoId);

        if (!todoItem) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        todoItem.completed = completed;
        await todoItem.save();

        return res.status(200).json({
            success: true,
            message: 'Todo status updated successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// get todos list
exports.gettodos = async (req, res) => {
    const { userId } = req.user;

    try {
        const todos = await todoListModel.find({ userId });

        return res.status(200).json({
            success: true,
            todos
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get completed todos  
exports.getCompletedTodos = async (req, res) => {
    const { userId } = req.user;

    try {
        const completedTodos = await todoListModel.find({ userId, completed: true });
        res.status(200).json({ completedTodos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get pending todos
exports.getPendingTodos = async (req, res) => {
    const { userId } = req.user;

    try {
        const pendingTodos = await todoListModel.find({ userId, completed: false });
        res.status(200).json({ pendingTodos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




// update todos
exports.updateTodo = async (req, res) => {
    const { todoId, todo } = req.body;
    const { userId } = req.user;

    try {
        const todoItem = await todoListModel.findOne({ _id: todoId, userId });

        if (!todoItem) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found or does not belong to the user'
            });
        }

        todoItem.todo = todo;
        await todoItem.save();

        return res.status(200).json({
            success: true,
            message: 'Todo updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// delete todo
exports.deleteTodo = async (req, res) => {
    const { todoId } = req.body;

    try {
        await todoListModel.findByIdAndDelete(todoId);

        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
