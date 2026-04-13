import { useState, useEffect } from "react"; 
import { useAuth } from "../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router";
import snarkdown from "snarkdown";  
import styles from "./Detail.module.css";

const JobSection = ({ title, content }) => {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
};

export default function JobDetail() {
  const { isLoggedIn, login, logout } = useAuth();
  const { jobId } = useParams();
  console.log(jobId);

  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Job not found");
        return response.json();
      })
      .then((json) => {
        setJob(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jobId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Cargando oferta...</p>
        {/* aquí puedes pegar el HTML de skeleton que ya tienes preparado */}
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className={styles.error}>
        <h1>Oferta no encontrada</h1>
        <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
        <button
          className={styles.errorButton}
          onClick={() => navigate("/jobs")}
        >
          Volver a la lista de empleos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <a href="/search" className={styles.breadcrumbButton}>
          Empleos
        </a>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
      </nav>

      {/* Header principal */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{job.titulo}</h1>
          <div className={styles.meta}>
            <p className={styles.company}>
              {job.empresa} {job.ubicacion}
            </p>
          </div>
        </div>
        <button className={styles.applyButton}>
          {isLoggedIn ? "Aplicar a esta oferta" : "Inicia sesión para aplicar"}
        </button>
      </header>

      {/* Aquí irán las secciones de contenido */}

      <div className={styles.sections}>
        <JobSection
          title="Descripcion del puesto"
          content={job.content.description}
        />
        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </div>
      <div className={styles.footer}>
        <button disabled={!isLoggedIn} className={styles.applyButton}>
          {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
        </button>
      </div>
    </div>
  );
}
