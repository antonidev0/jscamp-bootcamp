 

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
          {/* hola un saludo, yo tengo una pequeña confusion aca.
          cuando uso react state, el estado inicial siempre sera apagado cierto?
          por ejemplo, en este caso es: cuando le de click,  le cambias el estado de no guardado a guardado? */}
          <button onClick={() => setGuardado(!guardado)}>
              
              {guardado ? "❤️ soy positivo Guardado" : "🤍 Guardar"}
              
          </button>
          


      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
    </article>
  );
}
    