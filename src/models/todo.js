// This is a Todo Model which will interact with our mongoDB

import mongoose from 'mongoose';
import todoSchema from '../schema/todo.js';

// This model will be created from a schema
const Todo = mongoose.model('todo', todoSchema);
export { Todo };
