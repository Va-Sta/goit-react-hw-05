import { createContext, useState, useEffect } from "react";
import { getConfig } from "../services/api_tmdb";

export const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    getConfig()
      .then((data) => {
        setConfig(data);
      })
      .catch((error) => {
        console.error("Error fetching configuration:", error);
      });
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
