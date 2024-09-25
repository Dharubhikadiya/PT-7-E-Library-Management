import React, { useState, useEffect } from "react";

const BookForm = ({ existingBook, onSave }) => {
  const [book, setBook] = useState(
    existingBook || { title: "", author: "", genre: "", publicationDate: "", image: "" }
  );

  useEffect(() => {
    if (existingBook) {
      setBook(existingBook);
    }
  }, [existingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(book);
    setBook({ title: "", author: "", genre: "", publicationDate: "", image: "" });
  };

  return (
    <form
      className="book-form bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold mb-6 text-center">
        {book.id ? "Edit Book" : "Add Book"}
      </h3>
      
      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Title:</span>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-blue-200"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Author:</span>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-blue-200"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Genre:</span>
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-blue-200"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Publication Date:</span>
        <input
          type="text"
          name="publicationDate"
          value={book.publicationDate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-blue-200"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Image URL:</span>
        <input
          type="text"
          name="image"
          value={book.image}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-blue-200"
          placeholder="Enter image URL"
        />
      </label>

      <button
        type="submit"
        className="bg-gray-900 text-white fs-5 py-3 px-6 rounded-md w-full hover:bg-gray-700 transition duration-300"
      >
        Save Book
      </button>
    </form>
  );
};

export default BookForm;
