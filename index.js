import express from 'express';
import todoRouter from './src/routes/todo.js';
const { urlencoded } = express;
const app = express();
const PORT = 3000;

app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to FullStack development' });
});

app.use('/api/todo', todoRouter);

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
