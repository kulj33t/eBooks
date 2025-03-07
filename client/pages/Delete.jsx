import React, { useState } from "react";
import axios from "axios";
import "./Delete.css";

const Delete = () => {
  const [bookId, setBookId] = useState("");
  const [bookData, setBookData] = useState(null);
  const [buttonColor, setButtonColor] = useState("grey");


  const fetchBook = async () => {
    if (!bookId) {
      alert("Please enter a Book ID.");
      setButtonColor("red");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/books/${bookId}`);
      setBookData(response.data);
      setButtonColor("green");
    } catch (error) {
      console.error("Book not found:", error);
      setBookData(null);
      setButtonColor("red");
      alert("Book not found.");
    }
  };

  // Delete Book
  const deleteBook = async () => {
    if (!bookId) return;

    try {
      await axios.delete(`http://localhost:8000/books/${bookId}`);
      alert("Book deleted successfully!");
      setBookData(null);
      setBookId("");
      setButtonColor("grey");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
      setButtonColor("red");
    }
  };

  return (
    <div className="delete-page-container">
      <div className="delete-content-box">
        <h2>Delete a Book</h2>
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="delete-input-field"
        />
        <button onClick={fetchBook} className="delete-action-button" style={{ backgroundColor: buttonColor }}>
          Fetch Book
        </button>

        {bookData && (
          <div className="delete-book-details">
            <h3>{bookData.bookname}</h3>
            <p><strong>Author:</strong> {bookData.author}</p>
            <p>{bookData.description}</p>
            <button onClick={deleteBook} className="delete-action-button delete-button">
              Delete Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delete;
