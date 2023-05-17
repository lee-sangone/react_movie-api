import { Suspense, lazy } from "react";
import MoviePage from "./movielist";
import { Route, Router, Routes } from "react-router-dom";
import TestPage from "./moviedetail/detail";

const App = () => {
  return (
    <Routes>
      <Route path="/movielist" element={<MoviePage />} />
      <Route path="/moviedetail" element={<TestPage />} />
    </Routes>
  );
};

export default App;
