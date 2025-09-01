import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddSchool from './AddSchool';
import ShowSchools from './ShowSchools';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="app-nav">
          <h1>School Management System</h1>
          <div className="nav-links">
            <Link to="/">Home (View Schools)</Link>
            <Link to="/add">Add New School</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<ShowSchools />} />
            <Route path="/add" element={<AddSchool />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;