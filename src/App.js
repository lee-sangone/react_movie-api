import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [image, setImage] = useState({ heroImage: "", image: "" });
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "554bd53ecdmsh7f80505d4814a44p114b4bjsn09bbcc73d52f",
      "X-RapidAPI-Host": "transfermarket.p.rapidapi.com",
    },
  };

  fetch(
    "https://transfermarket.p.rapidapi.com/clubs/get-squad?id=631&saison_id=2022&domain=de",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response?.squad?.length !== 0 && response?.squad !== undefined) {
        setImage({
          heroImage: response.squad[0].heroImage,
          image: response.squad[0].image,
        });
      }
    })
    .catch((err) => console.error(err));
  return (
    <div className="App">
      <img src={image.heroImage} />
      <img src={image.image} />
    </div>
  );
}

export default App;
