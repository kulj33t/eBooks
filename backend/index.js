import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passwd",
    database: "backend"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});


app.get("/", (req, res) => {
    res.json("Backend is running...");
});


app.post("/books", (req, res) => {
    const { bookname, description, author } = req.body;
    if (!bookname || !description || !author) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO books (bookname, description, author) VALUES (?, ?, ?)";
    db.query(query, [bookname, description, author], (err, result) => {
        if (err) {
            console.error("Error inserting book:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Book added successfully", bookId: result.insertId });
    });
});


app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, data) => {
        if (err) {
            console.error("Error fetching books:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(data);
    });
});


app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "SELECT * FROM books WHERE bookid = ?";
    
    db.query(query, [bookId], (err, result) => {
        if (err) {
            console.error("Error fetching book:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(result[0]);
    });
});


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const { bookname, description, author } = req.body;

    if (!bookname || !description || !author) {
        return res.status(400).json({ error: "All fields are required for update" });
    }

    const query = "UPDATE books SET bookname = ?, description = ?, author = ? WHERE bookid = ?";
    
    db.query(query, [bookname, description, author, bookId], (err, result) => {
        if (err) {
            console.error("Error updating book:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Book not found or no changes made" });
        }
        res.json({ message: "Book updated successfully!" });
    });
});


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE bookid = ?";

    db.query(query, [bookId], (err, result) => {
        if (err) {
            console.error("Error deleting book:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted successfully!" });
    });
});


app.post("/custom-query", (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);
    });
});



app.listen(8000, () => {
    console.log("Server running on port 8000.");
});
