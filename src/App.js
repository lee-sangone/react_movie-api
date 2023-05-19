import { Suspense, lazy } from "react";
import MoviePage from "./movielist/list";
import { Route, Router, Routes } from "react-router-dom";
import DetailPage from "./moviedetail/detail";

const App = () => {
  return (
    <Routes>
      <Route path="/movielist" element={<MoviePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default App;
