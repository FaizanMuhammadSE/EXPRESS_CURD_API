import { Todo } from '../models/todo.js';

// There are controllers of todo, which has all the CURD operations
const getAllTodos = async (req, res) => {
  const sortedBy = req.query.sortedBy || 'name';
  const sortedOrder = req.query.sortedOrder || 'asc';
  const page = req.query.page || 0;
  const size = req.query.size || 10;

  try {
    const todos = await Todo.find()
      .sort({
        [sortedBy]: sortedOrder?.toLowerCase() === 'asc' ? 1 : -1,
      })
      .skip(page * size)
      .limit((page + 1) * size);

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

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status, name, description } = req.body || {};
  if (!status || !name || !description) {
    const missingField =
      (!status && 'Status') ||
      (!name && 'Name') ||
      (!description && 'Description');
    res.status(400).json({ message: `${missingField} is required` });
  } else {
    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        {
          status,
          name,
          description,
        },
        { new: true } // Will give you object after the update
      );
      res.status(200).json(todo);
    } catch (error) {
      console.log('updateTodo error: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (error) {
    console.log('deleteTodo error: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export { getAllTodos, addTodo, updateTodo, deleteTodo };
