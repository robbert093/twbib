const express = require('express');
const router = express.Router();

const bookRouter = require('./book');
const authorRouter = require('./author');
const categoryRouter = require('./category');
const bookNoteRoutes = require('./bookNote');

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.use('/categories', categoryRouter);
router.use('/bookNotes', bookNoteRoutes);

module.exports = router;