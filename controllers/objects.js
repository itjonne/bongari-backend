const objectsRouter = require('express').Router();
const Object = require('../models/Object');
// const data = require('../data/objects.json');

const CATEGORIES = ['kala', 'kukkakasvi', 'sieni', 'lintu', 'nisakas', 'perhonen', 'puu_pensas'];

// ====== GET ======

objectsRouter.get('/', async (req, res) => {
  const objects = await Object.find({});
  res.json(objects);
});

objectsRouter.get('/:id', async (req, res) => {
  const object = await Object.findById(req.params.id);
  res.json(object);
});

objectsRouter.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  if (category in CATEGORIES) {
    const objects = await Object.find({ category: req.params.category });
    res.json(objects);
  } else {
    res.status(400).json({ error: `Category "${category}" not found` });
  }
});

/*
objectsRouter.post('/', async (req, res) => {
  const newObject = new Object(req.body);
  const savedObject = await newObject.save();
  res.json(savedObject);
});

/* eslint-disable no-restricted-syntax */
/*
objectsRouter.post('/populate', async (req, res) => {
  const createdObjects = [];
  const newData = JSON.parse(JSON.stringify(data));
  const keys = Object.keys(newData);

  const forLoop = async (_) => {
    for (const key of keys) {
      for (const item of data[key]) {
        const newObject = new Objec({
          name: item.name,
          name_latin: item.name_latin,
          family: item.family,
          image: item.image,
          category: item.species,
        });
        const savedObject = await newObject.save();
        createdObjects.push(savedObject);
      }
    }
  };
  await forLoop();

  res.json(createdObjects);
});
*/

module.exports = objectsRouter;
