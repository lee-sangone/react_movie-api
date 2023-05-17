import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { API_KEY, IMG_BASE_URL } from "../constant";

const MoviePage = () => {
  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("movieList", movieList);
  }, [movieList]);

  // useEffect(() => {
  //   if (rating !== 0 ) {
  //     const tempMovieList = movieList.filter(
  //       ({ vote_average }) => rating <= vote_average
  //     );
  //     console.log("temmpMOvielist", tempMovieList, "rating", rating);
  //     setMovieList(tempMovieList);
  //   }
  // }, [rating]);

  const handleSubmitKeyword = async (e) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    // await fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //       Authorization: "Bearer 38e573123051e1013744bb409ca78d43",
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => setMovieList(res.results))
    //   .catch((err) => console.error(err));

    const { data } = await axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${keyword}`, {
        headers: {
          Authorization: API_KEY,
        },
      })
      .catch((e) => {
        console.log(e);
      });
    setMovieList(data.results);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleChangeRating = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
      <h1>영화 검색 페이지</h1>
      <div>
        <form onSubmit={handleSubmitKeyword}>
          <input
            value={keyword}
            onChange={handleChangeKeyword}
            placeholder="영화 제목"
          />
          <select value={rating} onChange={handleChangeRating}>
            <option value={0}>선택안함</option>
            <option value={7.0}>7.0 이상</option>
            <option value={7.5}>7.5 이상</option>
            <option value={8.0}>8.0 이상</option>
            <option value={8.5}>8.5 이상</option>
            <option value={9.0}>9.0 이상</option>
          </select>
          <button type="submit">검색</button>
        </form>
      </div>

      <div>
        <ul>
          {movieList.map(
            ({ id, title, poster_path, release_date, vote_average }, index) => {
              if (rating <= vote_average)
                return (
                  <li key={`${id}_${index}`}>
                    <div>{title}</div>
                    {poster_path ? (
                      <img
                        src={`${IMG_BASE_URL}${poster_path}`}
                        onClick={() => {
                          navigate(`/detail/${id}`);
                        }}
                      />
                    ) : (
                      <div>이미지 없음</div>
                    )}
                    <div>출시일 : {release_date}</div>
                    <div>평점 : {vote_average}</div>
                  </li>
                );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default MoviePage;