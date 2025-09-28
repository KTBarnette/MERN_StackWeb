import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './components/BookList';

function App() {
    const API_BASE = import.meta.env.VITE_API_URL;

    const [books, setBooks] = useState([]);
    const [view, setView] = useState('available'); // 'available' or 'checked out'

    const fetchBooks = () => {
        const route = view === 'available' ? '/books' : '/books/out';
        axios.get(`${API_BASE}${route}`)
            .then(res => setBooks(res.data))
            .catch(err => console.error('Error fetching books:', err));
    };

    useEffect(() => {
        fetchBooks();
    }, [view]); // Re-fetch books when view changes

    const handleCheckin = (id) => {
        axios.post(`${API_BASE}/books/${id}/checkin`)
            .then(() => fetchBooks())
            .catch(err => console.error('Checkin error:', err));
    };

    const handleCheckout = (id) => {
        axios.post(`${API_BASE}/books/${id}/checkout`, {
            checkedOutBy: "Frontend User",
            dueDate: "2025-06-01"
        })
            .then(() => fetchBooks())
            .catch(err => console.error('Checkout error:', err));
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h1>📚 {view === 'available' ? 'Available Books' : 'Checked-Out Books'}</h1>

            <button onClick={() => setView(view === 'available' ? 'checked out' : 'available')}>
                Show {view === 'available' ? 'Checked-Out' : 'Available'} Books
            </button>

            <BookList
                books={books}
                onCheckin={handleCheckin}
                onCheckout={handleCheckout}
            />
        </div>
    );
}

export default App;
