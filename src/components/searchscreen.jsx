// SearchScreen.jsx
import React, { useState, useEffect } from 'react';
import './searchscreen.css';

const SearchScreen = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="search-screen">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button className="close-button" onClick={onClose}>Close</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="search-results">
          {searchResults.map((movie) => (
            <div key={movie.show.id} className="search-result-item">
              <img
                src={movie.show.image?.original}
                alt={movie.show.name}
                className="search-thumbnail"
              />
              <div className="search-info">
                <h3 className="search-title">{movie.show.name}</h3>
                <p className="search-summary" dangerouslySetInnerHTML={{ __html: movie.show.summary }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
