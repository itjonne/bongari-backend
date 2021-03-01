const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const checkPassword = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash);
  return match;
};

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  if (!(await checkPassword(body.password, user.passwordHash)) || !user) {
    return res.status(401).json({ error: 'Invalid password or username' });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  return res.status(200).json({ token, id: user._id });
});

module.exports = loginRouter;
