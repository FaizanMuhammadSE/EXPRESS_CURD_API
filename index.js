import express from 'express';
import { todoRouter } from './src/routes/todo.js';
import { connectDatabase } from './src/controllers/misc.js';
const { urlencoded } = express;
const app = express();
const PORT = 3000;

connectDatabase('todos');
app.use(urlencoded({ extended: true }));
app.use('/todo', todoRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Express Todo API' });
});

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
