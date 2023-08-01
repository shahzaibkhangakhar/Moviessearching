import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import Search from "../pages/Search/Search";

const AppRouter = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" exact element={<Search />} />
        <Route path="/detail" exact element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
