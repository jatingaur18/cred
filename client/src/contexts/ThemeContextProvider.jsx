import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;