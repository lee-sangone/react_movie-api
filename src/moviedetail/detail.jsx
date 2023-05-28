import { useParams } from "react-router-dom";
import { API_KEY, IMG_BASE_URL } from "../constant";
import { useState } from "react";
import useGetData from "../hooks/useGetData";
import "./detail.css";

const DetailPage = () => {
  const { id } = useParams();
  const detailData = useGetData(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const [_status, _setStatus] = useState("");

  console.log(detailData);
  // useEffect(() => {
  //   const getMovieDetail = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `
  //       https://api.themoviedb.org/3/movie/${id}`,
  //         {
  //           headers: {
  //             Authorization: API_KEY,
  //           },
  //         }
  //       );
  //       setDetailData(data);
  //     } catch (e) {
  //       setDetailData(undefined);
  //       console.log("err", e);
  //     }
  //   };
  //   getMovieDetail();
  // }, []); //useEffect는 (depth가 없을 떄)페이지가 마운트 됐을때 한번 일어남, 7,8번째 줄은 계속 읽힘

  return (
    // <Suspense fallback={<div>로딩중...</div>}>
    <div className="detail_container">
      {/* {detailData.map(
          (
            { tagline, overview, release_date, runtime, title, id },
            index //{} 표시를 쓰면 return을 해줘야함 () 표시하면 바로  return 됌
          ) => (
            <li key={`${index}_${id}`}>
              <div>{title}</div>
              <div>{tagline}</div>
              <div>상영시간 : {runtime} 분</div>
              <div>출시일 : {release_date}</div>
              <div>줄거리 : {overview}</div>
            </li>
          )
        )} */}

      {detailData && (
        <>
          <div className="detail_title">{detailData.title}</div>
          <div className="detail_tagline">{detailData.tagline}</div>
          <div className="detail_info">
            <div className="detail_overview">{detailData.overview}</div>
            <div className="detail_runtime">
              {detailData.release_date} / {detailData.runtime} minutes
            </div>
          </div>
        </>
      )}
    </div>
    // </Suspense>
  );
};

export default DetailPage;
