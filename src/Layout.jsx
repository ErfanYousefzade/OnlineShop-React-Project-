import Foter from "./components/Foter";
import Header from "./components/Header";
import { useContext } from "react";

import ThemeContext from "./Contexts/ThemContext";

export default function Layout({ children }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <Header />

      {children}

      <Foter />
    </>
  );
}
