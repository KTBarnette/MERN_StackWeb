import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

import express from 'express';
import mongoose from 'mongoose';
import booksRouter from './routes/books.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(process.env['MONGO_URI'])
    .then(() => console.log(' MongoDB connected'))
    .catch(err => console.error(' MongoDB error', err));

app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
