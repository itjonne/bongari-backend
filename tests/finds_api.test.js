const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helpers = require('./test_helpers');
const User = require('../models/User');
const Find = require('../models/Find');
const Object = require('../models/Object');

const api = supertest(app);

describe('POST test', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Object.deleteMany({});
    await Find.deleteMany({});
    const user = await helpers.createRootUser();
    const objects = helpers.createInitialObjects();
    await Object.insertMany(objects);
    await user.save();
  })

  test('Add a valid find for root-user', async () => {
    const foundObject = await Object.findOne({ name: 'Mutu' });
    const rootUser = await User.findOne({ username: helpers.ROOT_USER.username });
    const initialToken = helpers.createTokenFor(rootUser);
    const initialFinds = [...rootUser.finds];

    const find = {
      user: rootUser._id,
      object: foundObject._id,
    }

    await api.post('/api/finds')
      .set('Authorization', 'bearer ' + initialToken)
      .send(find)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');

    const userAfterPost = await User.findOne({ username: helpers.ROOT_USER.username });
    expect(userAfterPost.finds.length).toBe(initialFinds.length + 1);
  })
})

afterAll(() => {
  mongoose.connection.close();
})