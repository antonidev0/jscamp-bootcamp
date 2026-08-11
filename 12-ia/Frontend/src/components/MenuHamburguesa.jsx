import { useState } from "react";
import styles from "./MenuHamburguesa.module.css";

export function MenuHamburguesa({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        className={styles.toggle}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        {children}
      </div>
    </>
  );
}
