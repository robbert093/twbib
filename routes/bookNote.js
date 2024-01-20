const express = require('express');
const router = express.Router();
const {Book, BookNote} = require('../models');


// Create a new book note
router.post('/', async (req, res) => {
  try {
    const { content, bookId } = req.body;
    const newBookNote = await BookNote.create({ content, BookId: bookId });
    res.status(201).json(newBookNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all book notes
router.get('/', async (req, res) => {
  try {
    const bookNotes = await BookNote.findAll({ include: Book });
    res.json(bookNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific book note by ID
router.get('/:id', async (req, res) => {
  const bookNoteId = req.params.id;

  try {
    const bookNote = await BookNote.findByPk(bookNoteId, { include: Book });
    if (bookNote) {
      res.json(bookNote);
    } else {
      res.status(404).json({ error: 'BookNote not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a book note by ID
router.put('/:id', async (req, res) => {
  const bookNoteId = req.params.id;
  const { content, bookId } = req.body;

  try {
    const bookNote = await BookNote.findByPk(bookNoteId);
    if (bookNote) {
      await bookNote.update({ content, BookId: bookId });
      res.json(bookNote);
    } else {
      res.status(404).json({ error: 'BookNote not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a book note by ID
router.delete('/:id', async (req, res) => {
  const bookNoteId = req.params.id;

  try {
    const bookNote = await BookNote.findByPk(bookNoteId);
    if (bookNote) {
      await bookNote.destroy();
      res.json({ message: 'BookNote deleted successfully' });
    } else {
      res.status(404).json({ error: 'BookNote not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;