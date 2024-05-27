import express from 'express';
import { addTodo, getAllTodos, updateTodo } from '../controllers/todo.js';

const todoRouter = express.Router();

todoRouter.use((req, res, next) => {
  console.log('Todo Router :', new Date().toLocaleString());
  next();
});

todoRouter.route('/').get(getAllTodos).post(addTodo);
todoRouter.route('/:id').put(updateTodo);

export { todoRouter };

// Altough we can define routes using express app directly, but we have a better way to define modular routes
// by using Router. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
// We can attach middlewares to this router specifically
// now we can easily register this router in app
// by using app.use('prefix-path', todoRouter); now this prefix path is not necessary to be defined inside router handlers
