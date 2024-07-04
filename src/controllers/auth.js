import jwt from 'jsonwebtoken';
import { EXPIREY_IN_HOURS, SALT_ROUNDS } from '../constants/index.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

export const signupHandler = async (req, res) => {
  const { username, password } = req.body;

  /**
   * Validate credentails
   */
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide username and password' });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ message: 'Password must be at least 8 characters' });
    return;
  }

  const user = await User.find({ username }).exec();

  /**
   * As usename already exists in the database, prompt user to provide another username
   */
  if (user?.length) {
    res.status(400).json({ message: 'User already exists!' });
    return;
  }

  /**
   * Hashing the password inorder to save it in the database
   * Normally we don't save Raw password in the database
   * Once the password has been hashed it can't be reverted to the original value
   */
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = new User({ username, password: hashPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created successfully!' });
};

export const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide username and password' });
    return;
  }

  try {
    const user = await User.find({ username }).exec();

    if (!user?.length) {
      res.status(400).json({
        message: 'User does not exist! Please create your account first',
      });
      return;
    }

    /**
     * Validate user provided password with hashedPassword
     */
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (isValidPassword) {
      const token = jwt.sign(
        { name: user[0].username },
        process.env.SECRET_KEY,
        { expiresIn: `${EXPIREY_IN_HOURS}h` }
      );

      res.cookie('Authorization', `Bearer ${token}`, {
        maxAge: EXPIREY_IN_HOURS * 60 * 60 * 1000, // milliseconds
        secure: true, // Ensures the cookie is only sent over HTTPS
        httpOnly: true,
        sameSite: 'None',
      });

      res.status(200).json({ message: 'login successful' });
    } else {
      res
        .status(400)
        .json({ message: 'Invalid Credentials, Please Try Again!' });
    }
  } catch (error) {
    console.log('loginHandler error: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkAuth = async (req, res, next) => {
  if (!req.cookies) {
    res.status(401).json({ message: 'Unauthorized! Please Login First...' });
    return;
  }
  console.log(req.cookies.Authorization);
  const token = req.cookies.Authorization;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized! Please Login First...' });
    return;
  }

  try {
    const user = jwt.verify(token?.split(' ')?.[1], process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log('checkAuth error: ', error);
    res.status(401).json({ message: 'Unauthorized! Please Login First...' });
  }
};
