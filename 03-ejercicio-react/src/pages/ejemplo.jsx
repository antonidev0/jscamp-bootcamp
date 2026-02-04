import * as React from "react";

// export function JobCard({ titulo, empresa }) {
//     const [aplicado, setAplicado] = React.useState(false);
//     const [guardado, setGuardado] = React.useState(false);
//   const [likes, setLikes] = React.useState(0);

//   return (
//     <article>
//           <h3>{titulo}</h3>

//       <button onClick={() => setAplicado(true)} disabled={aplicado}>

//               {aplicado ? "¡Aplicado!" : "Aplicar"}

//           </button>
//           {/* hola un saludo, yo tengo una pequeña confusion aca.
//           cuando uso react state, el estado inicial siempre sera apagado cierto?
//           por ejemplo, en este caso es: cuando le de click,  le cambias el estado de no guardado a guardado? */}
//           <button onClick={() => setGuardado(!guardado)}>

//               {guardado ? "❤️ soy positivo Guardado" : "🤍 Guardar"}

//           </button>

//       <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
//     </article>
//   );
// }

export function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  // ¡Añadimos esto para ver cuándo se ejecuta!
  console.log("🔄 JobCard se está renderizando. Título:", titulo);

  // Estado: ¿el usuario aplicó a este empleo?
  const [aplicado, setAplicado] = React.useState(false);

  const handleAplicar = () => {
    console.log("👆 Click en aplicar");
    setAplicado(true); // Cambiamos el estado a true
  };

  console.log("📊 Estado actual de aplicado:", aplicado);

  return (
    <article className="job-listing-card">
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button
        className={
          aplicado ? "button-apply-job is-applied" : "button-apply-job"
        }
        onClick={handleAplicar}
        disabled={aplicado}
      >
        {aplicado ? "¡Aplicado!" : "Aplicar"}
      </button>
    </article>
  );
}