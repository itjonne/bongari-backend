const findsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Find = require('../models/Find');
const User = require('../models/User');

findsRouter.get('/', async (req, res) => {
  const finds = await Find.find({});
  res.json(finds);
});

// TODO: Tää varmaan jonkun authin taakse?
findsRouter.get('/:userId', async (req, res) => {
  const userFinds = await Find.find({ user: req.params.userId }).populate('object');
  res.json(userFinds);
});

findsRouter.get('/:objectId', async (req, res) => {
  const objectFinds = await Find.find({ object: req.params.objectId }).populate('user', { username: 1 });
  res.json(objectFinds);
});

findsRouter.get('/:id', async (req, res) => {
  const find = await Find.findById(req.params.id);
  res.json(find);
});

findsRouter.post('/', async (req, res) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userFromToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(userFromToken.id);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const newFind = new Find({
    ...req.body,
    user: user.id,
  });

  const savedFind = await newFind.save();
  user.finds = user.finds.concat(savedFind._id);
  await user.save();

  return res.status(201).json(savedFind);
});

module.exports = findsRouter;
