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

const addTodo = async (req, res) => {
  const { status, name, description } = req.body || {};
  if (!status || !name || !description) {
    const missingField =
      (!status && 'Status') ||
      (!name && 'Name') ||
      (!description && 'Description');
    res.status(400).json({ message: `${missingField} is required` });
  } else {
    const newTodo = new Todo({
      status,
      name,
      description,
    });
    try {
      const todo = await newTodo.save();
      res.status(201).json(todo);
    } catch (error) {
      console.log('addTodo error: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export { getAllTodos, addTodo };
