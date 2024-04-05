import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext({});

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if(theme === 'light') {
            document.body.classList.remove('dark')
        } else {
            document.body.classList.add('dark')
        }
    }, [theme]);


    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext)