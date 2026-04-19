/* Crea aquí tu archivo 404 */
import styles from "./404.module.css";
import { Link } from "../components/Link.jsx";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
        className={styles.icon}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9"
        />
      </svg>

      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.description}>
          Oops! Parece que has ingresado a la URL equivocada.
        </p>
      </div>

      <Link href="/" className={styles.button}>
        Volver al Inicio
      </Link>
    </div>
  );
}
 