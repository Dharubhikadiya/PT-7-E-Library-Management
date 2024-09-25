import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Updated to Routes
import LibraryManager from "./components/LibraryManager";
import BookDetail from "./components/BookDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import "tailwindcss/tailwind.css";
import "./App.css"; 

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1></h1>
        </header>
        <main>
          <Routes> 
            <Route path="/" element={<LibraryManager />} /> 
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
