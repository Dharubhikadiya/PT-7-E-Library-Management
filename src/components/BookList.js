import React from "react";
import { Link } from "react-router-dom";

const placeholderImage = "https://via.placeholder.com/150";

const BookList = ({ books, onEdit }) => {
  return (
    <div className="book-list-container mt-6">
      <h2 className="text-2xl font-semibold text-center">Available Books</h2>
      <div className="container book-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-6 justify-center">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="book-card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center"
            >
              <img
                src={book.image || placeholderImage}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded"
                onError={(e) => (e.target.src = placeholderImage)} 
              />
              <h3 className="text-lg font-semibold text-center mb-2">{book.title}</h3>
              
              <button
                onClick={() => onEdit(book)}
                className="mt-2 bg-yellow-500 text-white py-1 px-4 rounded w-full text-center"
              >
                Edit
              </button>
              <button className="mt-2 bg-green-500 text-white py-1 px-4 rounded w-full text-center">
                <Link to={`/book/${book.id}`}>View Details</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
