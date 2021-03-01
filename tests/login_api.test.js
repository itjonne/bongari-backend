const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const User = require('../models/User');
const helpers = require('./test_helpers');

const api = supertest(app);

describe('Login POST test', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = await helpers.createRootUser();
    await user.save();
  });

  test('Login with correct credentials', async () => {
    const credentials = {
      username: helpers.ROOT_USER.username,
      password: helpers.ROOT_USER.password,
    };

    const response = await api.post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    const token = response.body.token;

    const userFromToken = jwt.verify(token, process.env.SECRET);
    delete userFromToken.iat; // Remove the extra issued at
    expect(userFromToken).toEqual({ username: helpers.ROOT_USER.username, id: response.body.id });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
