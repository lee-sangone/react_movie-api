import axios from "axios";
import { useParams } from "react-router-dom";
import { API_KEY } from "../constant";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const [getDetails, setGetDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getMovieDetail = async () => {
      let results;
      try {
        const { data } = await axios.get(
          `
        https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );
        results = [data];
      } catch (e) {
        console.log("err", e);
      }
      console.log(results);
      setGetDetails(results);
    };
    getMovieDetail();
  }, []);

  return (
    <div>
      <ul>
        {getDetails.map(
          ({ tagline, overview, release_date, runtime, title, id }, index) => {
            <li key={`${index}_${id}`}>
              <div>{title}</div>
              <div>{tagline}</div>
              <div>상영시간 : {runtime} 분</div>
              <div>출시일 : {release_date}</div>
              <div>줄거리 : {overview}</div>
            </li>;
          }
        )}
      </ul>
    </div>
  );
};

export default DetailPage;
