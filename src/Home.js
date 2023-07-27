import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=&query=${query}`
    );
    setSearchResults(response.data.results);
  };

  return (
    <div className="container glass">
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Carousel>
        {searchResults.map(movie => (
          <div key={movie.id} className="item">
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="item-img" />
              <div className="item-desc">
                <p>{movie.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
