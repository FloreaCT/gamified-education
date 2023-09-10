import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/tailwind.css";
import App from "./App";
import { EventProvider } from "./utils/EventContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>
);
