import React, { useState } from 'react';
import './../Style/SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement your search functionality here
  };

  return (
    <div className="search-container1">
      <header className="roadmap-header1">
            <div className="logo-container">
              <h1 className="logo1">
                Track<span className="logo-highlight">IT</span>
              </h1>
            </div>
          </header>
      <div className="search-wrapper1">
        <form onSubmit={handleSearch}>
          <div className="search-input-wrapper1">
            <input
              type="text"
              placeholder="search anything"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="search-icon1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      <div className="search-title1">
        <br />
      </div>
    </div>
  );
};

export default SearchBar;