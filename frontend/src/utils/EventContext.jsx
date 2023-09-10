// EventContext.js
import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [latestEvent, setLatestEvent] = useState("");

  return (
    <EventContext.Provider value={{ latestEvent, setLatestEvent }}>
      {children}
    </EventContext.Provider>
  );
};
