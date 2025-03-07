import React, { useState } from "react";
import axios from "axios";
import "./Add.css";

const Add = () => {
  const [formData, setFormData] = useState({
    bookname: "",
    description: "",
    author: "",
  });

  const [buttonColor, setButtonColor] = useState("grey");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bookname || !formData.description || !formData.author) {
      alert("All fields are required.");
      setButtonColor("red"); // Indicate error
      return;
    }

    try {
      await axios.post("http://localhost:8000/books", formData);
      alert("Book added successfully!");
      setFormData({ bookname: "", description: "", author: "" }); // Reset form
      setButtonColor("green"); // Indicate success
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
      setButtonColor("red");
    }
  };

  return (
    <div className="add-page-container">
      <div className="add-content-box">
        <h2>Add a New Book</h2>
        <form className="add-form-layout" onSubmit={handleSubmit}>
          <input
            type="text"
            name="bookname"
            placeholder="Book Name"
            value={formData.bookname}
            onChange={handleChange}
            className="add-input-field"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="add-textarea-field"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="add-input-field"
          />
          <button type="submit" className="add-action-button" style={{ backgroundColor: buttonColor }}>
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
