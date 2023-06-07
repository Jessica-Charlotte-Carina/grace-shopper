const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {
  models: { User },
} = require('../db');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);

    if (user) {
      const token = generateToken(user);
      res.send({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user);
    res.send({ token });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    if (user) {
      res.send(user);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (ex) {
    next(ex);
  }
});

// Generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    type: user.type,
  };

  return jwt.sign(payload, 'ad', { expiresIn: '1h' });
};