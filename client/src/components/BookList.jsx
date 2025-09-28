// client/src/components/BookList.jsx
import BookCard from './BookCard';

function BookList({ books, onCheckin, onCheckout }) {
    return (
        <div>
            {books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                books.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onCheckin={onCheckin}
                        onCheckout={onCheckout}
                    />
                ))
            )}
        </div>
    );
}

export default BookList;
