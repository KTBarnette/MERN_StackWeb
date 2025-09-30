import express from 'express';
const router = express.Router();
import Book from '../models/Book.js';

// GET /api/books/available
router.get('/available', async (req, res) => {
    try {
        const books = await Book.find({ status: 'available' });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/books/checkedout
router.get('/checkedout', async (req, res) => {
    try {
        const books = await Book.find({ status: 'checked out' });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/books/checkout/:ISBN
router.post('/checkout/:ISBN', async (req, res) => {
    const { ISBN } = req.params;
    const { checkedOutBy, dueDate } = req.body;

    try {
        const book = await Book.findOne({ ISBN });

        if (!book) return res.status(404).json({ error: 'Book not found' });
        if (book.status === 'checked out') return res.status(400).json({ error: 'Book already checked out' });

        book.status = 'checked out';
        book.checkedOutBy = checkedOutBy;
        book.dueDate = dueDate;

        await book.save();
        res.json({ message: 'Book checked out successfully', book });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/books/checkin/:ISBN
router.post('/checkin/:ISBN', async (req, res) => {
    const { ISBN } = req.params;

    try {
        const book = await Book.findOne({ ISBN });

        if (!book) return res.status(404).json({ error: 'Book not found' });
        if (book.status === 'available') return res.status(400).json({ error: 'Book is not currently checked out' });

        book.status = 'available';
        book.checkedOutBy = null;
        book.dueDate = null;

        await book.save();
        res.json({ message: 'Book checked in successfully', book });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
