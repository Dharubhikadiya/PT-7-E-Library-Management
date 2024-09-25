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
  const [showForm, setShowForm] = useState(false); // Manage form visibility

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
    setShowForm(false); 
  };

  const handleEditBook = (book) => {
    setSelectedBook(book); 
    setShowForm(true); 
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm); 
    setSelectedBook(null); 
  };

  return (
      <div>
      <nav className="bg-gray-900 text-white shadow-md sticky top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-3">
          <div className="text-2xl font-bold">
            <img src="https://lh5.googleusercontent.com/proxy/uYea7I2gdY40F6eFy0fARWz00ufD-14QLWnVKswMQMZUXbiytaeGG8udn3Ex7j7SuR4jmU07J_1oNAC8lNh5nQ" alt="Logo" width={60} />
          </div>
          
          <div className="flex space-x-6">
              <button onClick={toggleFormVisibility} className="hover:text-gray-200 text-lg fs-5">
                {showForm ? "Hide Form" : "Add Books"}
              </button>
          </div>

          <div className="flex items-center">
              <input type="text" value={searchTerm}
              onChange={handleSearchChange} placeholder="Filter by all Genre, Author, Publication Date" className="w-64 p-2 rounded-l-md text-gray-900"/>
              <button className="bg-blue-300 p-2 px-3 rounded-r-md hover:bg-blue-400 text-blue-900 font-bold">Search</button>
          </div>
        </div>
      </nav>

      <div className="library-manager container mx-auto pb-10">
      
      {showForm && (
        <BookForm existingBook={selectedBook} onSave={handleSaveBook} />
      )}

      <BookList books={filteredBooks} onEdit={handleEditBook} />
    </div>
  </div>
  );
};

export default LibraryManager;
