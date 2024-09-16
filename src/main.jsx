import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// import MovieRating from "./MovieRating";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <MovieRating /> */}
    {/* <StarRating message={["Bad", "Not bad", "Okay", "Good", "Very Good"]} />
    <StarRating color="blue" size={24} defaultRating={3} /> */}
  </StrictMode>
);
