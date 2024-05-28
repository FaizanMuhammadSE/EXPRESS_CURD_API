import express from 'express';
import { loginHandler, signupHandler } from '../controllers/index.js';
const authRouter = express.Router();

authRouter.post('/signup', signupHandler);
authRouter.post('/login', loginHandler);

export { authRouter };
