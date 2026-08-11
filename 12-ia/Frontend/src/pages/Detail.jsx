import { useState, useEffect } from "react";  
import { useAuthStore } from "../store/authStore.js"; 
import { Link } from "../components/Link";
import { useParams, useNavigate } from "react-router";
import snarkdown from "snarkdown";  
import styles from "./Detail.module.css";
import { useFavoritesStore } from "../store/favoritesStore.js";

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

function DetailPageBreadcrumb ({ job }) {
  return ( 
     <div className={styles.conainer}> 
      <nav className={styles.breadcrumb}>
        <Link href="/search" className={styles.breadcrumbButton}>
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
    </nav>
  </div>
  )
}

function IASummary({ job }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai/summary/${job.id}`);
      if (!response.ok) throw new Error("Error generating summary");

      const data = await response.json();
      setSummary(data.summary ?? "No se pudo generar el resumen.");
    } catch (err) {
      console.error(err);
      setError("Error al generar resumen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={generateSummary}
        disabled={loading}
        className={styles.summaryButton}
      >
        {loading ? "Generando resumen..." : "Generar resumen con IA"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {summary && <p className={styles.summary}>{summary}</p>}
    </div>
  );
}
function DetailApplyButton({ aplicado, setAplicado }) {
  const { isLoggedIn } = useAuthStore(); 

  return (
    <button
      disabled={!isLoggedIn}
      className={styles.applyButton}
      onClick={() => setAplicado(true)}
    >
      {!isLoggedIn
        ? "Iniciar Sesion para Aplicar"
        : aplicado
          ? "Aplicado"
          : "Aplicar ahora"}
    </button>
  );
}

function DetailPageHeader({ job, aplicado, setAplicado }) {
 
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{job.titulo}</h1>
          <div className={styles.meta}>
            <p className={styles.company}>
              {job.empresa} {job.ubicacion}
            </p>
          </div>
        </div>
        <DetailApplyButton aplicado={aplicado} setAplicado={setAplicado} />
        <DetailFavoriteButton jobId={job.id} />
      </header>
    </>
  );
}

function DetailFavoriteButton({ jobId }) { 
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)} className={styles.favoriteButton}>
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  );

}


export default function JobDetail() { 
  const { jobId } = useParams(); 

  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aplicado, setAplicado] = useState(false); 

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
      <DetailPageBreadcrumb job={job} />
      <DetailPageHeader
        job={job}
        aplicado={aplicado}
        setAplicado={setAplicado}
      />

      <IASummary job={job} />

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
        <DetailApplyButton aplicado={aplicado} setAplicado={setAplicado} />
      </div>
    </div>
  );
}

