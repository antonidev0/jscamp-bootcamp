import os from "node:os";
import ms from "ms";

console.log("Sistema:", os.type());
console.log("Plataforma:", os.platform());
console.log("Arquitectura:", os.arch());
console.log(
  "Memoria total:",
  (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
  "GB",
);
console.log(
  "Memoria libre:",
  (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
  "GB",
);
console.log("Home:", os.homedir());
console.log("Uptime:", ms(os.uptime() * 1000), "segundos");
