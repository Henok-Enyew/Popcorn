import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./componenets/App";
import "./styles/index.css";
// import CurrencyConverter from "./CurrencyConverter";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <CurrencyConverter /> */}
  </StrictMode>
);
