const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = async function(candidatePwd) {
  // Compare the plain version to an encrypted version of the password
  return await bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = new Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function(token) {
  console.log("token here:", token)
  console.log("user.findbytoken:",process.env.JWT)
  try {
    console.log("hit try block for findbytoken")
    const JWTisValid = jwt.verify(token, process.env.JWT ); // 'flowershop' is the key
    // console.log(JWTisValid)
    const userId = JWTisValid.id; // Extract the user ID from the token payload
    const user = await User.findByPk(userId);
    
    // const user = await User.findByPk(id);
    if (!user) {
      // console.log("not user")
      // throw new Error('nooo');
      return null
    }
    return user;
  } catch (ex) {
    const error = new Error('bad token in User.js');
    error.status = 401;
    console.log("Error in User.js :",ex)
    // throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async user => {
  // Encrypt the password with bcrypt if it has been changed
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)));