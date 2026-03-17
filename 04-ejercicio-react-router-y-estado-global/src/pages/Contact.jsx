import { useForm } from "../hooks/useFrom.jsx";

function validateContact(values) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!values.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El email no es válido";
  }

  if (!values.message.trim()) {
    errors.message = "El mensaje es obligatorio";
  }

  return errors;
}

export function Contact() {
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useForm({
    initialValues: { name: "", email: "", message: "" },
    validate: validateContact,
  });

  return (
    <div className="contact-container">
      <h1>📧 Contacto</h1>
      <p>¿Tienes alguna pregunta? Contáctanos.</p>
      <form className="empleos-search-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <div>
          <label htmlFor="message">Mensaje:</label>
          <input
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
          {isSubmitted && (
            <p style={{ color: "green" }}>¡Mensaje enviado correctamente!</p>
          )}
        </button>
      </form>
    </div>
  );
}
