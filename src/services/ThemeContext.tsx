import { createContext, ReactNode, useContext, useState } from 'react';
import { Appearance } from 'react-native';

interface ThemeProviderProps {
    children : ReactNode
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({children}: ThemeProviderProps){
    const colorScheme = Appearance.getColorScheme()
    const[theme,setTheme]=useState(colorScheme||'dark')

    const toggleTheme = ()=>{
        setTheme((prev)=>(prev === "dark"?"light":"dark"));
    }

    const themeColors = {
        light:{
            background:'#fff',
            text:'#000',
            button:'#007',
            buttonText:'#fff'
        },
        dark:{
            background:'#000',
            text:'#fff',
            button:'#59e067',
            buttonText:'#252525'
        }
    }
    return(
        <ThemeContext.Provider value={{theme,toggleTheme,colors:themeColors[theme]}}>
            {children}
        </ThemeContext.Provider>
    )
}