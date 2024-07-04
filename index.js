import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config(); // load environment variables from .env file
import { checkAuth, connectDatabase } from './src/controllers/index.js';
import { authRouter, todoRouter } from './src/routes/index.js';
const { urlencoded } = express;
const app = express();
const PORT = 3000;

connectDatabase('todos');
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use((req, res, next) => {
  // Set the header to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});
app.use('/auth', authRouter);
app.use(checkAuth); // User should be authorized before proceeding to next middlewares
app.use('/todo', todoRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Express Todo API' });
});

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
