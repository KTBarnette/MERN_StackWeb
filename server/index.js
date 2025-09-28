
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Book from './models/Book.js'; // Ensure the file extension is added



// Step 3: Create an Express application
const app = express(); // Start the Express application

// Step 4: Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with the frontend URL if different
}));
app.use(express.json()); // Automatically parse incoming JSON requests (useful for POST requests)

// Step 5: Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI) // Use the MONGO_URI from the .env file
    .then(() => console.log(' MongoDB connected')) // If connection is successful
    .catch(err => console.error(' MongoDB connection error:', err)); // If connection fails

app.get('/', (req, res) => {
    res.send('Welcome to the Library API!');
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({ status: 'available' }); // Find books with status 'available'
        res.json(books); // Send the books as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});

// Endpoint 2: Get a list of all books that are checked out
app.get('/books/out', async (req, res) => {
    try {
        const books = await Book.find({ status: 'checked out' }); // Find books with status 'checked out'
        res.json(books); // Send the books as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});

// Endpoint 3: Check out a book (requires book ID and additional details)
app.post('/books/:id/checkout', async (req, res) => {
    // The ":id" in the URL represents the ID of the book to update
    const { checkedOutBy, dueDate } = req.body; // Get checkedOutBy and dueDate from the request body
    try {
        const book = await Book.findOneAndUpdate(
            { id: parseInt(req.params.id) }, // Match book by integer 'id' instead of ObjectId
            { status: 'checked out', checkedOutBy, dueDate }, // Update its status and other info
            { new: true } // Return the updated book in the response
        );

        res.json(book); // Send the updated book as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});

// Endpoint 4: Check in a book (requires book ID)
app.post('/books/:id/checkin', async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { status: 'available', checkedOutBy: null, dueDate: null },
            { new: true }
        );

        res.json(book); // Send the updated book as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});

// Step 7: Start the server on a specific port
const PORT = process.env.PORT || 5000; // The port number is either defined in .env or defaults to 5000
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`); // Serve and log the port number
});