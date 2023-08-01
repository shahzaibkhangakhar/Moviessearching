import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./movieDetail.css";
function MovieDetail() {
  const location = useLocation();
  const [detail, setDetail] = useState();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    console.log("====================================");
    console.log(location.state.id);
    console.log("====================================");
    axios
      .get(`http://www.omdbapi.com/?&i=${location.state.id}&apikey=2a784bc4`)
      .then((res) => {
        // handle success
        if ("data" in res) {
          console.log(res.data);
          setDetail(res.data);
        }
      })
      .catch((e) => {
        // handle error
        console.log("error", e);
      });
  };
  return (
    <div>
      {detail ? (
        <div>
          <div className="movie-details">
            <div className="movie-poster">
              <img src={detail.Poster} alt={detail.Title} />
            </div>
            <div className="movie-info">
              <h1>{detail.Title}</h1>
              <p>
                <strong>Year:</strong> {detail.Year}
              </p>
              <p>
                <strong>Rated:</strong> {detail.Rated}
              </p>
              <p>
                <strong>Released:</strong> {detail.Released}
              </p>
              <p>
                <strong>Runtime:</strong> {detail.Runtime}
              </p>
              <p>
                <strong>Genre:</strong> {detail.Genre}
              </p>
              <p>
                <strong>Director:</strong> {detail.Director}
              </p>
              <p>
                <strong>Writer:</strong> {detail.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {detail.Actors}
              </p>
              <p>
                <strong>Plot:</strong> {detail.Plot}
              </p>
              <p>
                <strong>Language:</strong> {detail.Language}
              </p>
              <p>
                <strong>Country:</strong> {detail.Country}
              </p>
              <p>
                <strong>Awards:</strong> {detail.Awards}
              </p>
              <p>
                <strong>Metascore:</strong> {detail.Metascore}
              </p>
              <p>
                <strong>IMDb Rating:</strong> {detail.imdbRating}
              </p>
              <p>
                <strong>IMDb Votes:</strong> {detail.imdbVotes}
              </p>
              <p>
                <strong>Type:</strong> {detail.Type}
              </p>
              <p>
                <strong>DVD:</strong> {detail.DVD}
              </p>
              <p>
                <strong>Box Office:</strong> {detail.BoxOffice}
              </p>
              <p>
                <strong>Production:</strong> {detail.Production}
              </p>
              <p>
                <strong>Website:</strong> {detail.Website}
              </p>
              <div className="ratings">
                <h3>Ratings:</h3>
                {detail.Ratings.map((rating, index) => (
                  <p key={index}>
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MovieDetail;
