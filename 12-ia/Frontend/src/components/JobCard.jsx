import { Link } from "../components/Link.jsx";
import { useState } from "react";
import styles from "./JobCard.module.css"
import { useFavoritesStore } from "../store/favoritesStore.js";
import { useAuthStore } from "../store/authStore.js";

function JobCardFavoriteButton({ job }) { 
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isLoggedIn } = useAuthStore();
  
  // const isFavorite = useStore((state) => state.isFavorite);
  // const toggleFavorite = useStore((state) => state.toggleFavorite);

  return (
    <button disabled={!isLoggedIn} onClick={() => toggleFavorite(job.id)}>
      {isFavorite(job.id) ? "❤️" : "🤍"}
    </button>
  );
}

function JobCardApplyButton({ jobId }) {
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore();

   const handleApplyClick = () => {
     setIsApplied(true);
   };

   const buttonClasses = isApplied
     ? "button-apply-job is-applied"
     : "button-apply-job";
   const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
          <button disabled={!isLoggedIn} onClick={handleApplyClick} className={buttonClasses}>
          {buttonText}
        </button>
  )
}

export function JobCard({ job }) { 

 
  return (
    <article
      className="job-listing-card"
      aria-label={`Empleo: ${job.titulo}`}
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

        <JobCardApplyButton jobId={job.id} />

        <JobCardFavoriteButton job={job} />
      </div>
    </article>
  );
}
