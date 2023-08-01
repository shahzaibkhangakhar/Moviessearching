import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import Movie from "../../Components/Movie/Movie";
import Recommendation from "../Recommendation/Recommendation";
function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [showRec, setShowRec] = useState(true);
  const getData = () => {
    axios
      .get(`http://www.omdbapi.com/?i=tt3896198&apikey=2a784bc4&s=${search}`)
      .then((res) => {
        console.log(res);
        // handle success
        if ("data" in res) {
          console.log(res.data.Search);
          setData(res.data.Search);
          setShowRec(false);
        }
      })
      .catch((e) => {
        // handle error
        console.log("error", e);
      });
  };
  return (
    <div>
      <div className="container">
        <p className="title">Search a Movie</p>
        <input
          className="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            getData();
          }}
        >
          Search
        </button>
      </div>

      {showRec ? (
        <Recommendation />
      ) : (
        <div>
          {data && data.length > 0 ? (
            <div className="movie-container">
              {data.map((item) => (
                <Movie key={item.imdbID} movie={item} />
              ))}
            </div>
          ) : (
            <p>No movie found with searched title</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
