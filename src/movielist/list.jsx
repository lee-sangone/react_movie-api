import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./list.css";
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
    <div className="page_container">
      <h1 className="page_title">Search the Movie</h1>
      <div className="list_search_container">
        <form
          onSubmit={handleSubmitKeyword}
          className="search_option_container"
        >
          <input
            value={keyword}
            onChange={handleChangeKeyword}
            placeholder="영화 제목"
            className="search_keyword"
          />
          <select
            value={rating}
            onChange={handleChangeRating}
            className="search_rating"
          >
            <option value={0}>선택안함</option>
            <option value={7.0}>7.0 이상</option>
            <option value={7.5}>7.5 이상</option>
            <option value={8.0}>8.0 이상</option>
            <option value={8.5}>8.5 이상</option>
            <option value={9.0}>9.0 이상</option>
          </select>
          <button type="submit" className="search_submit">
            검색
          </button>
        </form>
      </div>

      <div className="movie_list_container">
        <ul className="movie_list">
          {movieList.map(
            ({ id, title, poster_path, release_date, vote_average }, index) => {
              if (rating <= vote_average)
                return (
                  <li key={`${id}_${index}`} className="movie_list_item">
                    <div className="contents_container">
                      <div className="list_title">{title}</div>
                      {poster_path ? (
                        <img
                          className="list_img"
                          src={`${IMG_BASE_URL}${poster_path}`}
                          onClick={() => {
                            navigate(`/detail/${id}`);
                          }}
                        />
                      ) : (
                        <div className="list_no_img">이미지 없음</div>
                      )}
                      <div className="list_release_date">
                        출시일 : {release_date}
                      </div>
                      <div className="list_rating">평점 : {vote_average}</div>
                    </div>
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
