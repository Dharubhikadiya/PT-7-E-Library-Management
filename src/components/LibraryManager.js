import React, { useState, useEffect } from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";

const defaultBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    image: "https://ia800505.us.archive.org/view_archive.php?archive=/25/items/m_covers_0010/m_covers_0010_78.zip&file=0010780935-M.jpg",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publicationDate: "1925",
    status: "available",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    image: "https://ia803000.us.archive.org/view_archive.php?archive=/3/items/m_covers_0008/m_covers_0008_41.zip&file=0008410842-M.jpg",
    author: "Harper Lee",
    genre: "Fiction",
    publicationDate: "1960",
    status: "available",
  },
  {
    id: 3,
    title: "1984",
    image: "https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_91.zip&file=0012919048-M.jpg",
    author: "George Orwell",
    genre: "Dystopian",
    publicationDate: "1949",
    status: "available",
  },
];

const LibraryManager = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      localStorage.setItem("books", JSON.stringify(defaultBooks));
      setBooks(defaultBooks);
    }
  }, []);

  useEffect(() => {
    handleFilterBooks();
  }, [searchTerm, books]);

  const handleFilterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publicationDate.includes(searchTerm)
      );
    }

    setFilteredBooks(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSaveBook = (newBook) => {
    if (newBook.id) {
      const updatedBooks = books.map((book) =>
        book.id === newBook.id ? newBook : book
      );
      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    } else {
      newBook.id = books.length + 1;
      const newBooks = [...books, newBook];
      setBooks(newBooks);
      localStorage.setItem("books", JSON.stringify(newBooks));
    }

    setSelectedBook(null); 
  };

  const handleEditBook = (book) => {
    setSelectedBook(book); 
  };

  return (
      <div>
      <div className="library-manager container mx-auto py-10">
      
      <div className="filters bg-white shadow-lg p-6 rounded-lg mb-6">
        <label className="block text-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-blue-200"
            placeholder="Filter by all Genre, Author, Publication Date"
          />
        </label>
      </div>

      <BookForm existingBook={selectedBook} onSave={handleSaveBook} />

      <BookList books={filteredBooks} onEdit={handleEditBook} />
    </div>
      </div>
    );
};

export default LibraryManager;
