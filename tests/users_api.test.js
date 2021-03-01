const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/User');
const helpers = require('./test_helpers');

const api = supertest(app);

describe('POST test for /api/users', () => {
  // Remove all old ones
  beforeEach(async () => {
    await User.deleteMany({});
    const rootUser = await helpers.createRootUser();
    await rootUser.save();
  });

  test('POST valid user', async () => {
    const initialUsers = await helpers.getUsersInDb();

    const newUser = {
      username: 'tester',
      name: 'Tester',
      email: 'email@email.com',
      password: 'password',
    };

    const response = await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toHaveProperty('username');
    const usersNow = await User.find({});

    expect(usersNow.length).toBe(initialUsers.length + 1);
  });

  test('POST invalid user', async () => {
    const initialUsers = await helpers.getUsersInDb();

    const newUser = {
      name: 'Testaaja',
      password: 'password',
    };

    const response = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body.error).toContain('username');

    const usersNow = await User.find({});
    expect(usersNow.length).toBe(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
