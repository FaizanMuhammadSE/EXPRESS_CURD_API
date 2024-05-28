import express from 'express';
import { connectDatabase } from './src/controllers/index.js';
import { authRouter, todoRouter } from './src/routes/index.js';
const { urlencoded } = express;
const app = express();
const PORT = 3000;

connectDatabase('todos');
app.use(urlencoded({ extended: true }));
app.use('/todo', todoRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Express Todo API' });
});

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
