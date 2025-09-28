import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
import mongoose from 'mongoose';
import Book from './models/Book.js';

const books = [
    {
        id: 1,
        title: "Reactions in REACT",
        author: "Ben Dover",
        publisher: "Random House",
        isbn: "978-3-16-148410-0",
        status: "available",
        checkedOutBy: null,
        dueDate: null
    },
    {
        id: 2,
        title: "Express-sions",
        author: "Frieda Livery",
        publisher: "Chaotic House",
        isbn: "978-3-16-148410-2",
        status: "available",
        checkedOutBy: null,
        dueDate: null
    },
    {
        id: 3,
        title: "Restful REST",
        author: "Al Gorithm",
        publisher: "ACM",
        isbn: "978-3-16-143310-1",
        status: "available",
        checkedOutBy: null,
        dueDate: null
    },
    {
        id: 4,
        title: "See Essess",
        author: "Anna Log",
        publisher: "O'Reilly",
        isbn: "987-6-54-148220-1",
        status: "checked out",
        checkedOutBy: "Homer",
        dueDate: "2023-01-01"
    },
    {
        id: 5,
        title: "Scripting in JS",
        author: "Dee Gital",
        publisher: "IEEE",
        isbn: "987-6-54-321123-1",
        status: "checked out",
        checkedOutBy: "Marge",
        dueDate: "2023-01-02"
    },
    {
        id: 6,
        title: "Be An HTML Hero",
        author: "Jen Neric",
        publisher: "Coders-R-Us",
        isbn: "987-6-54-321123-2",
        status: "checked out",
        checkedOutBy: "Lisa",
        dueDate: "2023-01-03"
    },
    {
        id: 7,
        title: "The Git Up",
        author: "Pushy Committ",
        publisher: "Version Control Press",
        isbn: "978-0-12-345678-9",
        status: "available",
        checkedOutBy: null,
        dueDate: null
    },
    {
        id: 8,
        title: "Node to Joy",
        author: "Eve Entloop",
        publisher: "Asynchronous Books",
        isbn: "978-0-98-765432-1",
        status: "available",
        checkedOutBy: null,
        dueDate: null
    },
    {
        id: 9,
        title: "Frontend Fanatics",
        author: "C. Sharp",
        publisher: "Byte Me Publishing",
        isbn: "978-1-23-456789-0",
        status: "checked out",
        checkedOutBy: "Bart",
        dueDate: "2025-05-01"
    },
    {
        id: 10,
        title: "Mongo Magic",
        author: "Doc Ument",
        publisher: "NoSQL House",
        isbn: "978-9-87-654321-0",
        status: "available",
        checkedOutBy: null,
        dueDate: null
    },
];


const seedBooks = async () => {
    try {
        await mongoose.connect(process.env['MONGO_URI']);
        console.log('Connected to MongoDB...');

        await Book.deleteMany({});
        console.log('Existing books removed from the database.');

        // Normalize keys: lowercase `isbn` → schema-compliant `ISBN`
        const normalizedBooks = books.map(book => {
            if (book.isbn && !book.ISBN) {
                book.ISBN = book.isbn;
                delete book.isbn;
            }
            return book;
        });

        const insertedBooks = await Book.insertMany(normalizedBooks, { ordered: false });
        console.log(`${insertedBooks.length} books successfully seeded into the database!`);
        insertedBooks.forEach(b => {
            console.log(`→ ${b.title} (ISBN: ${b.ISBN})`);
        });

    } catch (error) {
        console.error('Error seeding books:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed.');
    }
};

seedBooks();
