import { Link } from "../components/Link.jsx";
import { useState } from "react";
import styles from "./JobCard.module.css"
import { useFavoritesStore } from "../store/favoritesStore.js";

function JobCardFavoriteButton({ job }) { 
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <button onClick={() => toggleFavorite(job.id)}>
      {isFavorite(job.id) ? "❤️" : "🤍"}
    </button>
  );
}

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false); 

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied ? "button-apply-job is-applied" : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>
          <Link href={`/jobs/${job.id}`} className={styles.cardLink}>
            {job.titulo}
          </Link>
        </h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>

      <div className={styles.actions}>
        <Link href={`/jobs/${job.id}`} className={styles.details}>
          Ver Detalles
        </Link>

        <button onClick={handleApplyClick} className={buttonClasses}>
          {buttonText}
        </button>
        <JobCardFavoriteButton job={job} />
      </div>
    </article>
  );
}
