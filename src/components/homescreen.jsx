// HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import './homescreen.css';
import SearchScreen from './searchscreen';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleCardClick = (movie) => {
    setExpandedMovie(movie);
  };

  const handleClose = () => {
    setExpandedMovie(null);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="home-screen">
      <div className="title">Movie Display</div>
      <button className="search-button" onClick={toggleSearch}>
        Search
      </button>
      {showSearch && <SearchScreen onClose={toggleSearch} />}
      <div className={`movie-container ${expandedMovie ? 'expanded' : ''}`}>
        {movies.map((movie) => (
          <div
            key={movie.show.id}
            className={`movie-card ${expandedMovie === movie.show ? 'expanded' : ''}`}
            onClick={() => handleCardClick(movie.show)}
          >
            <img
              src={movie.show.image?.original}
              alt={movie.show.name}
              className="movie-thumbnail"
            />
            <div className="movie-info">
              <div className="movie-title">{movie.show.name}</div>
              <div
                className="movie-summary"
                dangerouslySetInnerHTML={{ __html: movie.show.summary }}
              />
            </div>
          </div>
        ))}
        {expandedMovie && (
          <div className="movie-details-overlay" onClick={handleClose}>
            <div className="movie-details">
              <img
                src={expandedMovie.image?.original}
                alt={expandedMovie.name}
                className="movie-details-thumbnail"
              />
              <div className="movie-details-content">
                <h2 className="movie-details-title">{expandedMovie.name}</h2>
                <div
                  className="movie-details-summary"
                  dangerouslySetInnerHTML={{ __html: expandedMovie.summary }}
                />
                <p><strong>Type:</strong> {expandedMovie.type}</p>
                <p><strong>Language:</strong> {expandedMovie.language}</p>
                <p><strong>Genres:</strong> {expandedMovie.genres.join(', ')}</p>
                <p><strong>Status:</strong> {expandedMovie.status}</p>
                <p><strong>Runtime:</strong> {expandedMovie.runtime} minutes</p>
                <p><strong>Premiered:</strong> {expandedMovie.premiered}</p>
                {expandedMovie.officialSite && (
                  <p><strong>Official Site:</strong> <a href={expandedMovie.officialSite} target="_blank" rel="noopener noreferrer">{expandedMovie.officialSite}</a></p>
                )}
                {/* Add other details as needed */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
