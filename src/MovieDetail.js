import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=74c783d3c0b68d8fa44d7e6d1163bd13`
      );
      setMovie(response.data);
    };

    fetchMovie();
  }, [id]);

  return movie ? (
    <div className="game-section">
      <h2 className="line-title">{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <Carousel dynamicHeight={false} showThumbs={false} className="custom-carousel">
        <div className="item" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`}}>
          <div className="item-desc">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </Carousel>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
};

export default MovieDetail;
