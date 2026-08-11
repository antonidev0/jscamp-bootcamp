"use strict";
/* ============================================
   SISTEMA SOLAR — TypeScript
   ============================================ */
// ---- Datos de los planetas ----
const PLANETS = [
    {
        id: "mercury",
        name: "Mercurio",
        diameter: "4.879 km",
        distance: "57,9 M km",
        period: "88 dias",
        temperature: "167 °C",
        description: "El planeta mas pequeno y cercano al Sol. Su superficie esta cubierta de crateres y no tiene atmosfera significativa.",
        color: "#b5a7a7",
    },
    {
        id: "venus",
        name: "Venus",
        diameter: "12.104 km",
        distance: "108,2 M km",
        period: "225 dias",
        temperature: "464 °C",
        description: "El planeta mas caliente del sistema solar debido a su densa atmosfera de CO2. Gira en sentido contrario a los demas planetas.",
        color: "#e8cda0",
    },
    {
        id: "earth",
        name: "Tierra",
        diameter: "12.742 km",
        distance: "149,6 M km",
        period: "365 dias",
        temperature: "15 °C",
        description: "Nuestro hogar. El unico planeta conocido que alberga vida, con agua liquida en su superficie y una atmosfera rica en nitrogeno y oxigeno.",
        color: "#4a90d9",
    },
    {
        id: "mars",
        name: "Marte",
        diameter: "6.779 km",
        distance: "227,9 M km",
        period: "687 dias",
        temperature: "-65 °C",
        description: "El planeta rojo. Tiene el volcan mas grande del sistema solar (Olympus Mons) y evidencia de agua en el pasado.",
        color: "#c1440e",
    },
    {
        id: "jupiter",
        name: "Jupiter",
        diameter: "139.820 km",
        distance: "778,5 M km",
        period: "11,9 anos",
        temperature: "-110 °C",
        description: "El gigante gaseoso mas grande. Su Gran Mancha Roja es una tormenta que lleva activa mas de 300 anos.",
        color: "#c8a55a",
    },
    {
        id: "saturn",
        name: "Saturno",
        diameter: "116.460 km",
        distance: "1.434 M km",
        period: "29,5 anos",
        temperature: "-140 °C",
        description: "Famoso por su impresionante sistema de anillos compuestos de hielo y roca. Es tan ligero que flotaria en agua.",
        color: "#e4d191",
    },
    {
        id: "uranus",
        name: "Urano",
        diameter: "50.724 km",
        distance: "2.871 M km",
        period: "84 anos",
        temperature: "-195 °C",
        description: "Un gigante de hielo que gira de lado, con su eje inclinado casi 98 grados. Tiene 27 lunas conocidas.",
        color: "#7de0e6",
    },
    {
        id: "neptune",
        name: "Neptuno",
        diameter: "49.244 km",
        distance: "4.495 M km",
        period: "165 anos",
        temperature: "-200 °C",
        description: "El planeta mas lejano. Tiene los vientos mas fuertes del sistema solar, superando los 2.000 km/h.",
        color: "#3b5ddb",
    },
];
const SUN_DATA = {
    id: "sun",
    name: "Sol",
    diameter: "1.392.700 km",
    distance: "0 km",
    period: "—",
    temperature: "5.500 °C (superficie)",
    description: "La estrella en el centro de nuestro sistema solar. Contiene el 99,86% de toda la masa del sistema y genera energia mediante fusion nuclear de hidrogeno.",
    color: "#ffcc33",
};
// ---- Canvas de estrellas ----
function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas)
        return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStars();
    }
    function drawStars() {
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const starCount = Math.floor((canvas.width * canvas.height) / 800);
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 1.4;
            const opacity = Math.random() * 0.7 + 0.1;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 220, 255, ${opacity})`;
            ctx.fill();
        }
        // Algunas estrellas mas brillantes
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 1.5 + 1;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
            gradient.addColorStop(0, "rgba(200, 220, 255, 0.8)");
            gradient.addColorStop(0.5, "rgba(150, 180, 255, 0.2)");
            gradient.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fill();
        }
    }
    window.addEventListener("resize", resize);
    resize();
}
// ---- Panel de información ----
function initInfoPanel() {
    const panel = document.getElementById("info-panel");
    const nameEl = document.getElementById("info-name");
    const diameterEl = document.getElementById("info-diameter");
    const distanceEl = document.getElementById("info-distance");
    const periodEl = document.getElementById("info-period");
    const tempEl = document.getElementById("info-temp");
    const descEl = document.getElementById("info-desc");
    const iconEl = panel.querySelector(".info-icon");
    function showInfo(data) {
        nameEl.textContent = data.name;
        diameterEl.textContent = data.diameter;
        distanceEl.textContent = data.distance;
        periodEl.textContent = data.period;
        tempEl.textContent = data.temperature;
        descEl.textContent = data.description;
        iconEl.style.background = data.color;
        iconEl.style.boxShadow = `0 0 10px ${data.color}`;
        panel.classList.remove("hidden");
    }
    // Click en planetas
    PLANETS.forEach((planet) => {
        const el = document.getElementById(planet.id);
        if (el) {
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                showInfo(planet);
            });
        }
    });
    // Click en el sol
    const sunEl = document.getElementById("sun");
    if (sunEl) {
        sunEl.addEventListener("click", (e) => {
            e.stopPropagation();
            showInfo(SUN_DATA);
        });
    }
    // Click fuera para cerrar
    document.addEventListener("click", () => {
        panel.classList.add("hidden");
    });
    // Evitar que click en panel lo cierre
    panel.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}
// ---- Controles de velocidad ----
function initControls() {
    const speeds = [0.25, 0.5, 1, 2, 4, 8];
    let currentSpeedIndex = 2; // 1x
    let paused = false;
    const universe = document.getElementById("universe");
    const speedDisplay = document.getElementById("speed-display");
    const btnSpeedUp = document.getElementById("btn-speed-up");
    const btnSpeedDown = document.getElementById("btn-speed-down");
    const btnPause = document.getElementById("btn-pause");
    const orbits = document.querySelectorAll(".orbit");
    const planets = document.querySelectorAll(".planet");
    const moonOrbit = document.querySelector(".moon-orbit");
    function applySpeed() {
        const multiplier = speeds[currentSpeedIndex];
        speedDisplay.textContent = `${multiplier}x`;
        // Obtener las duraciones base desde CSS custom properties
        const baseDurations = {
            mercury: 8,
            venus: 14,
            earth: 22,
            mars: 36,
            jupiter: 80,
            saturn: 140,
            uranus: 240,
            neptune: 380,
        };
        orbits.forEach((orbit) => {
            const planetName = orbit.dataset.planet;
            if (planetName && baseDurations[planetName]) {
                const newDuration = baseDurations[planetName] / multiplier;
                orbit.style.animationDuration = `${newDuration}s`;
                // Actualizar contra-rotación del planeta hijo
                const planet = orbit.querySelector(".planet");
                if (planet) {
                    planet.style.animationDuration = `${newDuration}s`;
                }
            }
        });
        // Luna
        if (moonOrbit) {
            moonOrbit.style.animationDuration = `${3 / multiplier}s`;
        }
    }
    btnSpeedUp.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentSpeedIndex < speeds.length - 1) {
            currentSpeedIndex++;
            applySpeed();
        }
    });
    btnSpeedDown.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentSpeedIndex > 0) {
            currentSpeedIndex--;
            applySpeed();
        }
    });
    btnPause.addEventListener("click", (e) => {
        e.stopPropagation();
        paused = !paused;
        universe.classList.toggle("paused", paused);
        btnPause.innerHTML = paused ? "&#9654;" : "&#9646;&#9646;";
    });
}
// ---- Posiciones iniciales aleatorias ----
function randomizeStartPositions() {
    const orbits = document.querySelectorAll(".orbit");
    orbits.forEach((orbit) => {
        const randomDelay = -(Math.random() * 100);
        orbit.style.animationDelay = `${randomDelay}s`;
        const planet = orbit.querySelector(".planet");
        if (planet) {
            planet.style.animationDelay = `${randomDelay}s`;
        }
    });
}
// ---- Inicialización ----
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    randomizeStartPositions();
    initInfoPanel();
    initControls();
});
