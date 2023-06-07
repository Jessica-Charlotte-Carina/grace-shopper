const router = require('express').Router();
const { models: { Product } } = require('../db');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization;

  if (token) {
    // Verify the token
    jwt.verify(token, 'admin', (err, user) => {
      if (err) {
        // Invalid token
        res.status(401).json({ message: 'Invalid token' });
      } else {
        // Valid token, set the user information in the reques
        req.user = user;
        next();
      }
    });
  } else {
    // Token not found
    res.status(401).json({ message: 'Token not found' });
  }
};


// GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// POST create a new product
router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT update a product
router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE delete a product
router.delete('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.status(204).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;