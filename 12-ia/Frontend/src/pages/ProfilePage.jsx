import { useAuthStore } from "../store/authStore.js";
import styles from "./ProfilePage.module.css";

export default function Profile() {
  const { logout } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileGrid}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarRing}>
              <div className={styles.avatar}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h1 className={styles.name}>Usuario Demo</h1>
            <p className={styles.role}>Frontend Developer</p>
            <p className={styles.email}>usuario@ejemplo.com</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>12</span>
              <span className={styles.statLabel}>Aplicaciones</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Entrevistas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1</span>
              <span className={styles.statLabel}>Ofertas</span>
            </div>
          </div>

          <div className={styles.sidebarActions}>
            <button className={styles.editButton}>Editar Perfil</button>
            <button className={styles.logoutButton} onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          {/* Info */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Información Personal</h2>
              <div className={styles.cardDot} />
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nombre completo</span>
                <span className={styles.infoValue}>Usuario Demo</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>usuario@ejemplo.com</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Teléfono</span>
                <span className={styles.infoValue}>+34 123 456 789</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Ubicación</span>
                <span className={styles.infoValue}>Madrid, España</span>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Experiencia</h2>
              <div className={styles.cardDot} />
            </div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.experienceTitle}>
                      Desarrollador Frontend
                    </h3>
                    <span className={styles.badge}>Actual</span>
                  </div>
                  <p className={styles.experienceCompany}>
                    Empresa XYZ · 2021 - Presente
                  </p>
                  <p className={styles.experienceDescription}>
                    Desarrollo de aplicaciones web con React, TypeScript y
                    Next.js
                  </p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <h3 className={styles.experienceTitle}>
                    Desarrollador Junior
                  </h3>
                  <p className={styles.experienceCompany}>
                    Startup ABC · 2019 - 2021
                  </p>
                  <p className={styles.experienceDescription}>
                    Mantenimiento y desarrollo de features en aplicaciones
                    legacy
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Habilidades</h2>
              <div className={styles.cardDot} />
            </div>
            <div className={styles.skills}>
              <span className={styles.skill}>React</span>
              <span className={styles.skill}>TypeScript</span>
              <span className={styles.skill}>Node.js</span>
              <span className={styles.skill}>CSS</span>
              <span className={styles.skill}>Git</span>
              <span className={styles.skill}>Next.js</span>
              <span className={styles.skill}>REST APIs</span>
              <span className={styles.skill}>SQL</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
