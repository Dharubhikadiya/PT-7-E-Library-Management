import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; 

const placeholderImage = "https://via.placeholder.com/150";

const BookList = ({ books, onEdit }) => {
  return (
    <div className="book-list-container mt-10">
      <div className="container book-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-6 justify-center">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="book-card bg-white shadow-lg rounded-lg p-2 pb-3 flex flex-col items-center justify-center"
            >
              <img
                src={book.image || placeholderImage}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded"
                onError={(e) => (e.target.src = placeholderImage)} 
              />
              <h3 className="text-lg font-semibold text-center mb-2">{book.title}</h3>
              
              <div className="flex items-center justify-between w-full mt-2 px-2">
              <Link
                to={`/book/${book.id}`}
                className="bg-gray-800 text-white py-1 px-4 rounded text-center w-4/5 hover:bg-gray-600"
              >
                View Details
              </Link>

              <button
                onClick={() => onEdit(book)}
                className="bg-blue-300 text-gray-900 p-2 rounded hover:bg-blue-400"
                aria-label="Edit"
              >
                <FaEdit size={18} />
              </button>
            </div>
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
