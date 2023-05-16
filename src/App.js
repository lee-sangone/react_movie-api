import { Suspense, lazy } from "react";
import MoviePage from "./movielist";
import { Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/movielist" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
