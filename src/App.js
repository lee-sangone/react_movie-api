import { Suspense, lazy } from "react";

const MoviePage = lazy(() => {
  return Promise.all([
    import("./movielist"),
    new Promise((resolve) => setTimeout(resolve, 4000)),
  ]).then(([moduleExports]) => moduleExports);
});
const App = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MoviePage />
    </Suspense>
  );
};

export default App;
