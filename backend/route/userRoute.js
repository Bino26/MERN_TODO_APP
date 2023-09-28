const express = require('express');
const router = express.Router();

const { signup, login, logout, getUser, userUpdate, userDelete } = require('../controllers/user.controller.js');
const { jwtAuth } = require('../middleware/jwtAuth.js');
const { signupDataValidate } = require('../middleware/signupDataValidate.js');
const { loginDataValidate } = require('../middleware/loginDataValidate.js');
const { addtodo, updateTodoStatus, gettodos,getCompletedTodos, getPendingTodos ,updateTodo, deleteTodo } = require('../controllers/todo-list.controller.js');

// ......auth....... 
router.post('/signup', signupDataValidate, signup);
router.post('/login', loginDataValidate, login);
router.get('/logout', jwtAuth, logout);

// ....user.........
router.get('/user', jwtAuth, getUser);
router.put('/user/update', jwtAuth, userUpdate);
router.delete('/user/delete', jwtAuth, userDelete);

// .....todos......
router.post('/addtodo', jwtAuth, addtodo)
router.get('/todos', jwtAuth, gettodos);
router.get('/completedTodos', jwtAuth, getCompletedTodos);
router.get('/pendingTodos', jwtAuth, getPendingTodos);
router.put('/todo/updateStatus', jwtAuth, updateTodoStatus);
router.put('/todo/update', jwtAuth, updateTodo);
router.delete('/todo/delete', deleteTodo);


module.exports = router;