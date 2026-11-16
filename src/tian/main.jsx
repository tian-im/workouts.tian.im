import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import TianApp from "./TianApp.jsx";
import { PlanProvider } from "./state/PlanContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlanProvider>
      <TianApp />
    </PlanProvider>
  </StrictMode>,
);
