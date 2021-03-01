const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password, email } = req.body;
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username,
    name,
    email,
    passwordHash,
  });
  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
});

usersRouter.put('/:id', async (req, res) => {
  const user = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true });
  res.json(updatedUser);
});

module.exports = usersRouter;
