import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

import App from "./app/App";

import {
  JourneyProvider,
} from "./app/context/JourneyContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <JourneyProvider>
      <App />
    </JourneyProvider>
  </React.StrictMode>
);