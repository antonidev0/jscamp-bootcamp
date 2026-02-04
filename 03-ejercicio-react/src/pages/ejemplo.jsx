 

import * as React from "react";

export function JobCard({ titulo, empresa }) {
  const [aplicado, setAplicado] = React.useState(false);
  const [guardado, setGuardado] = React.useState(false);
  const [likes, setLikes] = React.useState(0);

  return (
    <article>
      <h3>{titulo}</h3>
      <button onClick={() => setAplicado(true)} disabled={aplicado}>
        {aplicado ? "¡Aplicado!" : "Aplicar"}
      </button>
      <button onClick={() => setGuardado(!guardado)}>
        {guardado ? "❤️ Guardado" : "🤍 Guardar"}
      </button>
      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
    </article>
  );
}
