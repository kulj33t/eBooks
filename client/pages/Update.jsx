import React, { useState } from "react";
import axios from "axios";
import "./Update.css";

const Update = () => {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    bookname: "",
    description: "",
    author: "",
  });
  const [buttonColor, setButtonColor] = useState("grey");

  // Fetch book details by ID
  const fetchBook = async () => {
    if (!bookId.trim()) {
      alert("Please enter a Book ID.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8000/books/${bookId}`);
      setBook(res.data);
      setFormData({
        bookname: res.data.bookname,
        description: res.data.description,
        author: res.data.author,
      });
      setButtonColor("green"); // Book found, turn button green
    } catch (error) {
      console.error("Error fetching book:", error);
      alert("Book not found!");
      setBook(null);
      setButtonColor("red"); // Book not found, turn button red
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update book details
  const handleUpdate = async () => {
    if (!book) {
      alert("No book selected for updating.");
      return;
    }
    try {
      await axios.put(`http://localhost:8000/books/${bookId}`, formData);
      alert("Book updated successfully!");
      setBook(null);
      setBookId("");
      setButtonColor("grey"); // Reset button color
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book.");
    }
  };

  return (
    <div className="update-page-container">
      <div className="update-content-box">
        <h2>Update Book</h2>

        <div className="fetch-section">
          <input
            type="number"
            placeholder="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="fetch-input"
          />
          <button
            onClick={fetchBook}
            className="fetch-button"
            style={{ backgroundColor: buttonColor }}
          >
            Fetch Book
          </button>
        </div>

        {book && (
          <div className="update-form-layout">
            <input
              type="text"
              name="bookname"
              placeholder="Book Name"
              value={formData.bookname}
              onChange={handleChange}
              className="update-input-field"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="update-textarea-field"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="update-input-field"
            />
            <button onClick={handleUpdate} className="update-action-button">
              Update Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;
