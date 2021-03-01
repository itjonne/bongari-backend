const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Object = require('../models/object');

const ROOT_USER = {
  username: 'root',
  name: 'root',
  password: 'password',
  email: 'root@email.com',
};

const initialObjects = [
  {
    "name": "Peledsiika",
    "name_latin": "Coregonus peled",
    "family": "Lohet, Salmonidae",
    "image": "http://www.luontoportti.com/suomi/images/10249t.jpg",
    "category": "kala"
  },
  {
    "name": "Mutu",
    "name_latin": "Phoxinus phoxinus",
    "family": "Särkikalat, Cyprinidae",
    "image": "http://www.luontoportti.com/suomi/images/10255t.jpg",
    "category": "kala"
  },
];

const createInitialObjects = () => {
  return initialObjects.map(object => new Object(object));
}

const createTokenFor = (user) => {
  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.SECRET); 
  return token;
}

// For users
const createRootUser = async () => {
  const passwordHash = await bcrypt.hash(ROOT_USER.password, 10);
  const rootUser = new User({
    username: ROOT_USER.username,
    name: ROOT_USER.name,
    email: ROOT_USER.email,
    passwordHash,
  });
  return rootUser;
};

const getUsersInDb = async () => {
  const users = await User.find({});
  return users;
};

module.exports = { ROOT_USER, createRootUser, getUsersInDb, createInitialObjects, createTokenFor };
