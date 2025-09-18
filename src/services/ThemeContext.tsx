import { createContext, ReactNode, useContext, useState } from "react";
import { Appearance } from "react-native";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme || "dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const themeColors = {
    light: {
      background: "#fff",
      text: "#000",
      button: "#007",
      buttonText: "#fff",
      themeToggleText: "#d1d5db",
      inputBackground: "#f3f4f6",
    },
    dark: {
      background: "#000",
      text: "#fff",
      button: "#00A431",
      buttonText: "#252525",
      themeToggleText: "#252525",
      inputBackground: "#1f1f1f",
    },
  };
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colors: themeColors[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
