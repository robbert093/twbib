const express = require('express');
const router = express.Router();
const {Book, Author, Category} = require('../models');

// Create a new book
router.post('/', async (req, res) => {
  try {
    const bookData = req.body;
    const authorIds = bookData.authors;
    const categoryIds = bookData.categories;
    const authors = await Author.findAll({ where: { id: authorIds } });
    const categories = await Category.findAll({ where: { id: categoryIds } });    
    const newBook = await Book.create(bookData);
    newBook.setAuthors(authors);
    newBook.setCategories(categories);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll({ include: [Author, Category] });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId, { include: [Author, Category] });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;
  const authorIds = bookData.authors;
  const categoryIds = bookData.categories;
  console.log(bookData);

  try {
    const book = await Book.findByPk(bookId, { include: [Author, Category] }); 
    if (book) {
      bookData.Authors = await Author.findAll({ where: { id: authorIds } });
      bookData.Categories = await Category.findAll({ where: { id: categoryIds } });
      book.setAuthors(bookData.Authors);
      book.setCategories(bookData.Categories);
      await book.update(bookData, {include: [Author, Category]});
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);
    if (book) {
      await book.destroy();
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;