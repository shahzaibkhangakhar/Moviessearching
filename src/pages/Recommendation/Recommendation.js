import axios from "axios";
import React, { useEffect, useState } from "react";
import { generate, count } from "random-words";
import Movie from "../../Components/Movie/Movie";

function Recommendation() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    if (lastFetchTime == null) {
      localStorage.setItem("lastFetchTime", new Date().toLocaleString());
      getRandomMovies();
    } else {
      if (checkTime(lastFetchTime)) {
        getRandomMovies();
      } else {
        setMovies(JSON.parse(localStorage.getItem("savedMovies")));
      }
    }
  }, []);

  const checkTime = (lastFetchTime) => {
    const lastSavedDateTime = dateParser(lastFetchTime);

    const lastSavedDate = new Date(lastSavedDateTime);

    const currentDate = new Date();

    const timeDifferenceInMilliseconds =
      currentDate.getTime() - lastSavedDate.getTime();

    const timeDifferenceInMinutes =
      timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000);

    return timeDifferenceInMinutes > 1;
  };

  const dateParser = (date) => {
    const originalDateTime = date;

    // Split the original date and time string into separate parts
    const [datePart, timePart] = originalDateTime.split(", ");

    // Split the date part into day, month, and year
    const [day, month, year] = datePart.split("/");

    // Split the time part into hours, minutes, and seconds
    const [hours, minutes, seconds] = timePart.split(":");

    // Construct the new date string in ISO 8601 format
    const iso8601DateTime = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${hours}:${minutes}:${seconds}`;

    console.log(iso8601DateTime); // Output: "2023-07-16T18:41:17"
    return iso8601DateTime;
  };

  const getMovieData = async (movieTitle) => {
    const apiKey = "2a784bc4"; // Replace with your OMDb API key
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`
      );
      return response.data.Search[0];
    } catch (error) {
      console.error("Error fetching movie:", movieTitle, error);
      return null;
    }
  };
  const getRandomMovies = async () => {
    const randomMovies = generate(5);
    let arr = [];
    for (const movieTitle of randomMovies) {
      const movieName = await getMovieData(movieTitle);
      if (movieName) {
        arr.push(movieName);
      }
    }
    localStorage.setItem("savedMovies", JSON.stringify(arr));
    setMovies(arr);
  };

  return (
    <div>
      <h2 style={{paddingLeft:20}}>Recommendations</h2>
      {movies ? (
        <div className="movie-container">
          {movies.map((item) => (
            <Movie key={item.imdbID} movie={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Recommendation;
