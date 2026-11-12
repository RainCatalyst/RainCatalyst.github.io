window.SITE = {
  name: "Arseny Dremin",
  role: "Game & graphics programmer",
  blurb: "I make games, mostly the technical side: gameplay systems, shaders, VFX and tools. Five years of shipping on PC, console and mobile, with a co-founded indie studio on the side.",
  email: "arseny.dremin@proton.me",
  links: [
    { label: "CV", url: "/files/CV.pdf" },
    { label: "GitHub", url: "https://github.com/RainCatalyst" },
    { label: "itch.io", url: "https://freezedice.itch.io/" },
    { label: "ArtStation", url: "https://www.artstation.com/raincatalyst" },
  ],
  games: [
    {
      name: "Ultrapool", year: "2025", studio: "Icedrop Games",
      role: "Programming, design, tech art", engine: "Godot",
      platforms: "Steam · iOS · Android",
      note: "Pool-inspired roguelike deckbuilder. 100k+ copies sold.",
      url: "https://store.steampowered.com/app/4195110/Ultrapool/",
      video: "/img/projects/ultrapool.mp4",
    },
    {
      name: "Paleo Pines", year: "2023", studio: "Italic Pig",
      role: "Gameplay programmer", engine: "Unity",
      platforms: "Steam · Switch · PlayStation · Xbox",
      note: "Cozy dinosaur ranch sim. Gameplay systems, automation, editor tooling.",
      url: "https://store.steampowered.com/app/1202200/Paleo_Pines/",
      video: "/img/projects/paleo_new.mp4",
    },
    {
      name: "LOK Digital", year: "2023", studio: "Icedrop Games",
      role: "Tech art, additional programming", engine: "Unity",
      platforms: "Steam · Switch · iOS · Android",
      note: "Word-search puzzle adapted from a physical puzzle book. Overwhelmingly Positive on Steam (500+ reviews).",
      url: "https://store.steampowered.com/app/2207440/LOK_Digital/",
      video: "/img/projects/lok_new.mp4",
    },
    {
      name: "Constellations", year: "2021", studio: "Icedrop Games",
      role: "All programming, shaders, tech art", engine: "Godot",
      platforms: "Steam · Switch",
      note: "Minimal puzzle game about connecting stars.",
      url: "https://www.nintendo.com/de-de/Spiele/Nintendo-Switch-Download-Software/Constellations-2384059.html",
      video: "/img/projects/constellations.mp4",
    },
  ],
  other: [
    { name: "Game jams", year: "2018–", note: "15+ jam games over 8 years.", url: "https://freezedice.itch.io/", video: "/img/projects/reel_all.mp4" },
    { name: "VFX", year: "", note: "Real-time and rendered VFX in Houdini, Blender, Unity.", url: "https://www.artstation.com/raincatalyst", video: "/img/projects/vfx.mp4" },
    { name: "Zeus Renderer", year: "2025", note: "C++ path tracer: volumetrics, PBR, SDF fractals.", url: "https://github.com/RainCatalyst/ZeusRenderer", image: "/img/projects/zeus.png" },
    { name: "Shader toys", year: "", note: "Small Godot shader experiments.", url: "https://github.com/RainCatalyst", video: "/img/shaders/blackhole.mp4" },
    { name: "Arduino Raytracer", year: "2024", note: "Fixed-point raytracer on a microcontroller.", url: "https://github.com/RainCatalyst/ArduinoRaytracer", image: "/img/projects/arduino.png" },
    { name: "Ankidot", year: "2024", note: "Godot × Anki for language learning.", url: "https://github.com/RainCatalyst/Ankidot", video: "/img/projects/ankidot.mp4" },
  ],
  jobs: [
    { years: "2026–", title: "Unity Developer", at: "Forklift Interactive", url: "https://store.steampowered.com/app/3783980/Above_Colonies_of_the_Mist/" },
    { years: "2025–26", title: "Godot Developer", at: "Unannounced 3D action-adventure (NDA)" },
    { years: "2020–", title: "Co-founder, developer", at: "Icedrop Games", url: "https://icedropgames.com/#/games" },
    { years: "2024–25", title: "Teaching Assistant", at: "Saarland University Graphics Lab", url: "https://graphics.cg.uni-saarland.de/" },
    { years: "2022–24", title: "Gameplay Programmer", at: "Italic Pig", url: "https://store.steampowered.com/app/1202200/Paleo_Pines/" },
  ],
  education: [
    { years: "2023–26", title: "BSc Computer Science", at: "Saarland University" },
    { years: "2022–23", title: "Game Programming", at: "Futuregames, Sweden" },
  ],
};

window.media = (item, cls = "") =>
  item.video
    ? `<video class="${cls}" src="${item.video}" muted loop playsinline preload="metadata"></video>`
    : `<img class="${cls}" src="${item.image}" alt="${item.name}" loading="lazy">`;

window.playVisible = () => {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  }), { threshold: 0.25 });
  document.querySelectorAll("video[data-auto], video:not([data-manual])").forEach((v) => io.observe(v));
};
