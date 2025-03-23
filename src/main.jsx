import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "./contexts/GlobalContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <ToastContainer />
      <App />
    </GlobalProvider>
  </StrictMode>
);