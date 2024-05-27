import express from 'express';

const router = express.Router();

router.use((req, res) => {
  console.log('Todo Router :', new Date().toLocaleString());
});

router.get('/', (req, res) => {
  res.send('Here is a list of todos');
});

export default router;

// Altough we can define routes using express app directly, but we have a better way to define modular routes
// by using Router. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
// We can attach middlewares to this router specifically
// now we can easily register this router in app
// by using app.use('prefix-path', todoRouter); now this prefix path is not necessary to be defined inside router handlers
