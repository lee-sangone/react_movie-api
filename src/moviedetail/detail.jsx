import axios from "axios";
import { useParams } from "react-router-dom";
import { API_KEY } from "../constant";

const DetailPage = () => {
  const { id } = useParams();
  const getDetailMovie = async () => {
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
      results = data;
    } catch (e) {
      console.log("err", e);
    }
    console.log("test", results);
    return results;
  };

  return (
    <div>
      <h2>테스트 페이지</h2>
    </div>
  );
};

export default DetailPage;
