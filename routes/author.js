const express = require('express');
const router = express.Router();
const {Author, Book} = require('../models');

// Create a new author
router.post('/', async (req, res) => {
  try {
    const authorData = req.body;
    console.log(authorData);

    const newAuthor = await Author.create(authorData);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll({include: Book});
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific author by ID
router.get('/:id', async (req, res) => {
  const authorId = req.params.id;

  try {
    const author = await Author.findByPk(authorId, {include: Book});
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an author by ID
router.put('/:id', async (req, res) => {
  const authorId = req.params.id;
  const authorData = req.body;

  try {
    const author = await Author.findByPk(authorId);
    if (author) {
      await author.update(authorData);
      res.json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an author by ID
router.delete('/:id', async (req, res) => {
  const authorId = req.params.id;

  try {
    const author = await Author.findByPk(authorId);
    if (author) {
      await author.destroy();
      res.json({ message: 'Author deleted successfully' });
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;