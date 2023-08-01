import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./movie.css";
const Movie = (props) => {
  const { movie } = props;
  const navigate = useNavigate();
  return (
    <div
      class="movie-card"
      onClick={() => {
        navigate("/detail", { state: { id: movie.imdbID } });
      }}
    >
      <img src={movie.Poster} />
      <p class="title">{movie.Title}</p>
      <p class="year">{movie.Year}</p>
      {/* <p class="rating">Rating: 9.3</p>
      <p class="runtime">Runtime: 3h 6m</p>
      <p class="rating">PG-13</p> */}
    </div>
  );
};

export default Movie;
