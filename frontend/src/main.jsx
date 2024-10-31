import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserContext from "./contexts/userContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext.Provider
      value={{ username: "john_doe", password: "password123" }}
    >
      <App />
    </UserContext.Provider>
  </StrictMode>
);
