const express = require('express');
const router = express.Router();
const {Category, Book} = require('../models');

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await Category.create(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({include: Book});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific category by ID
router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId, {include: Book});
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const categoryData = req.body;

  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      await category.update(categoryData);
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      await category.destroy();
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
