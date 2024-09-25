import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const selectedBook = savedBooks.find((b) => b.id === parseInt(id));
    if (selectedBook) {
      setBook(selectedBook);
    }
  }, [id]);

  const handleBorrowReturn = () => {
    const updatedBook = { ...book, status: book.status === "available" ? "borrowed" : "available" };
    setBook(updatedBook);

    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = savedBooks.map((b) => (b.id === book.id ? updatedBook : b));
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-detail-page flex flex-col items-center py-8">
      <div className="book-detail-container bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
        <img 
          src={book.image} 
          alt={book.title} 
          className="book-image w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-lg mb-2"><strong>Author:</strong> {book.author}</p>
        <p className="text-lg mb-2"><strong>Genre:</strong> {book.genre}</p>
        <p className="text-lg mb-2"><strong>Publication Date:</strong> {book.publicationDate}</p>
        <p className="text-lg mb-4">
          <strong>Status:</strong> {book.status === "available" ? "Available" : "Borrowed"}
        </p>

        <button
          className="borrow-return-button bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 w-full mb-4"
          onClick={handleBorrowReturn}
        >
          {book.status === "available" ? "Borrow" : "Return"}
        </button>
      </div>
      <Link to="/">
        <button className="back-button bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mt-6">
          Back
        </button>
      </Link>
    </div>
  );
};

export default BookDetail;
