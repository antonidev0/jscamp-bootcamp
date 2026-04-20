import { useId } from 'react'
import { useNavigate } from 'react-router'
import styles from './Auth.module.css'
import { useAuthStore } from '../store/authStore'

export default function Register() {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()

  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get(nameId)
    const email = formData.get(emailId)
    const password = formData.get(passwordId)

    // Mock register - en una app real, harías una petición a la API
    if (name && email && password) {
      login()
      navigate('/search')
    }
  }

  return (
    <>
      <div className={styles.Allcontainer}>
        <div className={styles.headerAuth}>
          <h1 className={styles.title}>Crear cuenta</h1>
          <p className={styles.subtitle}>
            Regístrate para aplicar a ofertas de trabajo
          </p>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nombre completo
                </label>
                <input
                  id={nameId}
                  name={nameId}
                  type="name"
                  className={styles.input}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Correo electronico
                </label>
                <input
                  id={emailId}
                  type="email"
                  name={emailId}
                  className={styles.input}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Crea una clave
                </label>
                <input
                  id={passwordId}
                  name={passwordId}
                  type="password"
                  className={styles.input}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Iniciar Sesión
              </button>
            </form>

            <p className={styles.footer}>
              ¿No tienes cuenta?{" "}
              <a href="/login" className={styles.link}>
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}