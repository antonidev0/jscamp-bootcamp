import express from "express";

process.loadEnvFile();
const PORT_SERVER = process.env.PORT ?? 1234
console.log(PORT_SERVER);

const app = express();

app.get("/", (request, response) => {
  return response.send("<h1>Hola mundo desde Express</h1>.");
});

app.get("/health", (request, response) => {
  return response.json({
    status: "ok",
    uptime: process.uptime(),
  });
});


app.listen(PORT_SERVER, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT_SERVER}`);
});
