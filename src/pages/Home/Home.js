import React, { useState } from "react";
import Search from "../Search/Search";
import Recommendation from "../Recommendation/Recommendation";

function Home() {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
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
            setIsSearch(true);
          }}
        >
          Search
        </button>
      </div>
      {isSearch ? <Search search={search} /> : <Recommendation />}
    </div>
  );
}

export default Home;
