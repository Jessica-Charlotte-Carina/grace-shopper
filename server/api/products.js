const router = require('express').Router();
const { models: { Product }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({where: {id: req.params.productId}});
    res.json(product);
  } catch (err) {
    next(err);
  }
});

