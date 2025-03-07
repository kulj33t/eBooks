import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data);
            } catch (err) {
                console.error("Error fetching books:", err);
            }
        };
        fetchAllBooks();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Library</h1>
            <div className="grid">
                {books.map((book) => (
                    <div key={book.bookid} className="card">
                        <h2 className="book-title">{book.bookname}</h2>
                        <p className="book-id"><strong>ID:</strong> {book.bookid}</p>
                        <p className="author"><strong>Author:</strong> {book.author}</p>
                        <p className="description"><strong>Description:</strong> {book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
