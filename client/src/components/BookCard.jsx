// client/src/components/BookCard.jsx
function BookCard({ book, onCheckin, onCheckout }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Status:</strong> {book.status}</p>
            <p><strong>ID:</strong> {book.id}</p>

            {book.status === 'available' ? (
                <button onClick={() => onCheckout(book.id)}>Check Out</button>
            ) : (
                <button onClick={() => onCheckin(book.id)}>Check In</button>
            )}
        </div>
    );
}

export default BookCard;
