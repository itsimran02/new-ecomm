import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FilterContextProvider from "./state/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </StrictMode>
);
