/* Crea aquí tu archivo 404 */
function NotFound() {
  return (
    <div style={{display : "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </div>
  );
}

export { NotFound };