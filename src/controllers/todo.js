import { Todo } from '../models/todo.js';

// There are controllers of todo, which has all the CURD operations
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log('todos: ', todos);
    res.status(200).json(todos);
  } catch (error) {
    console.log('getAllTodos error: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllTodos };
