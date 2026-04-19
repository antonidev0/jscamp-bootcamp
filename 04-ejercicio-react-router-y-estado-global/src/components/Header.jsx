import { Link } from "./Link";  
import { useAuthStore } from "../store/authStore.js";
import { MenuHamburguesa } from "./MenuHamburguesa.jsx";
import styles from "./MenuHamburguesa.module.css";
import { useFavoritesStore } from "../store/favoritesStore.js";

export default function Header() {
  
  const { isLoggedIn, login, logout } = useAuthStore();
  const { countFavorites } = useFavoritesStore();
  const numFavorites = countFavorites();

  return (
    <>
      <header>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "white" }}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            DevJobs
          </h1>
        </Link>

        <MenuHamburguesa>
          <nav>
            <Link href="/search">Empleos</Link>

            {isLoggedIn && (
              <Link className={({ isActive }) => isActive ? "nav-link-active" : ""}
              to="profile">
                Favoritos (🧡{numFavorites})
              </Link>
            )}

            <Link href="/contact">Contacto</Link>
          </nav>

          {isLoggedIn ? (
            <button className={styles.transparence} onClick={logout}>
              Cerrar sesión
            </button>
          ) : (
            <button className={styles.transparence} onClick={login}>
              Iniciar sesión
            </button>
          )}
        </MenuHamburguesa>
      </header>
    </>
  );
};

