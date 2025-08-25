<script>
  const profile = {
    name: "Arseny Dremin",
    title: "Software engineer and game programmer.",
    description: "Recent IT graduate based in Germany with a focus on software engineering, graphics programming, and interactive applications. Experienced in building games, rendering engines, and tools across C++, C#, Python, and more. Passionate about solving complex problems and delivering polished, user-focused solutions.",
    aboutLink: "/about/",
    cvLink: "/files/CV.pdf",
    oldWebsiteLink: "/gamedev",
    logo: "/favicon.png" // Added logo path
  };

  const education = [
    {
      institution: "Saarland University",
      degree: "Bachelor in Computer Science",
      period: "Graduating in 2025"
    }
  ];

  const projects = [
    {
      name: "Zeus Renderer",
      url: "https://github.com/RainCatalyst?tab=repositories",
      description: "A custom C++ path-tracing engine with Blender scene import, volumetric rendering, and performance optimizations. Built on a modified Mitsuba v3 architecture.",
      image: "/img/projects/zeus.png",
      icon: "/img/other/github.svg"
    },
    {
      name: "Constellations",
      url: "https://www.nintendo.com/de-de/Spiele/Nintendo-Switch-Download-Software/Constellations-2384059.html",
      description: "A minimalistic puzzle game for PC and Nintendo Switch. I handled all programming, shaders, and technical art.",
      video: "/img/projects/constellations.mp4",
      icon: "/img/other/steam.svg"
    },
    {
      name: "Arduino Raytracer",
      url: "https://github.com/RainCatalyst/ArduinoRaytracer",
      description: "A simple yet functional C-based raytracer made to run on Arduino with custom integer math, rendered on a monochrome display.",
      image: "/img/projects/arduino.png",
      icon: "/img/other/github.svg"
    },
    {
      name: "Game Portfolio",
      url: "https://freezedice.itch.io/",
      description: "Over 15 small to mid-scale games, from jam entries to experimental prototypes.",
      video: "/img/projects/reel_all.mp4",
      icon: "/img/other/itch.svg"
    },
    {
      name: "Ankidot",
      url: "https://github.com/RainCatalyst/Ankidot",
      description: "A Godot & Anki integration for interactive language learning.",
      video: "/img/projects/ankidot.mp4",
      icon: "/img/other/github.svg"
    },
    {
      name: "VFX Portfolio",
      url: "https://www.artstation.com/raincatalyst",
      description: "A mix of real-time and renderered VFX, mostly done in Houdini, Blender or Unity.",
      video: "/img/projects/vfx.mp4",
      icon: "/img/other/artstation.svg"
    },
    {
      name: "UmaMusume Skill Optimizer",
      url: "https://github.com/RainCatalyst/UmaOptimizer",
      description: "A Python + Streamlit app using a genetic algorithm to optimize Uma Musume decks. Runs both on Streamlit and as a standalone site.",
      icon: "/img/other/github.svg"
    },
    {
      name: "NLP Reminder Bot",
      url: "https://github.com/RainCatalyst/ReminderBot",
      description: "A Python Telegram bot that can parse human readable dates for reminders",
      icon: "/img/other/github.svg"
    },
    {
      name: "Language Exercise Bot",
      url: "https://github.com/RainCatalyst/LanguageExerciseBot",
      description: "A Telegram bot that helps people practice a language with an LLM integration",
      icon: "/img/other/github.svg"
    }
  ];

  const jobs = [
    {
      name: "C# Gameplay Programmer @ Italic Pig",
      extra: "(2022-2024)",
      url: "https://store.steampowered.com/app/1202200/Paleo_Pines/",
      description: "Worked on Paleo Pines, a cozy dinosaur-themed farming sim in Unity. Focused on gameplay systems, with contributions to design and VFX.",
      image: "/img/projects/paleo.png"
    },
    {
      name: "Developer @ Icedrop Games",
      extra: "(2022-Now)",
      url: "https://icedropgames.com/#/games",
      description: "Co-founded a small studio with a friend, releasing multiple titles. I am mainly responsible for programming, automation and technical art.",
      image: "/img/projects/icedrop.png"
    },
    {
      name: "Teaching Assistant @ UdS Graphics Lab",
      extra: "(2024-Now)",
      url: "https://graphics.cg.uni-saarland.de/",
      description: "Assist in designing assignments and developing a custom rendering framework for the Computer Graphics course."
    }
  ];
</script>

<svelte:head>
  <title>{profile.name} - Portfolio</title>
  <meta name="description" content={profile.title} />
</svelte:head>

<style>
.list-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  padding-left: 1.5rem; /* space for bullet */
}

.list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.35em;
  width: 1.0rem;
  height: 1.0rem;
  background-image: url("/img/dot.svg"); /* custom bullet SVG */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.title-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
}

.media-preview {
  width: 12rem;
  height: 8rem;
  margin-left: 4rem;
  object-fit: cover;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .list-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .media-preview {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
    height: auto;
    max-height: 12rem; /* optional: keep proportions reasonable */
  }

  /* Education & work images */
  .list-item img:not(.title-icon) {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
    height: auto;
    max-height: 12rem;
  }
}
</style>

<div class="min-h-screen min-w-screen bg-[#0d0d0d] text-[#e4e4e4] font-sans flex justify-center items-start py-10 box-border">
  <div class="max-w-3xl w-full px-6">
  <header class="mb-6 flex items-center">
    <img src={profile.logo} alt="Logo" class="w-8 h-8 mr-3 object-contain" />
    <h1 class="text-4xl font-semibold text-[#e4e4e4] mb-0">{profile.name}</h1>
  </header>

  <div class="text-sm text-[#aaa] mb-4 flex flex-wrap gap-x-3 gap-y-1 items-center">
    <a href="mailto:arseny.dremin@proton.me" class="text-blue-400 hover:underline">Contact</a>
    <span>•</span>
    <a href="https://github.com/RainCatalyst" class="text-blue-400 hover:underline">GitHub</a>
    <span>•</span>
    <a href={profile.cvLink} download="ArsenyDremin_CV.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">Download CV</a>
    <span>•</span>
    <a href={profile.oldWebsiteLink} class="text-blue-400 hover:underline">Gamedev Portfolio</a>
  </div>

<p class="mb-4 text-[#e4e4e4]">
  Software engineer and game developer with experience in graphics programming, gameplay systems, and full-stack tools. <br><br>
    I've shipped multiple commercial games on PC and consoles, and I'm currently working on expanding my graphics programming skills.
    I also have experience with general web development, but I'm most focused on gameplay and graphics programming.
</p>

<p class="mb-4 text-[#aaa] text-sm">
  <strong>Tech stack:</strong> C++, C#, Python, Unity, Godot, GLSL/HLSL, Git, Blender, Arduino, NodeJS, Svelte
</p>

  <hr class="border-t border-white my-5" />

  <section class="my-8">
    <h2 class="text-2xl font-semibold text-[#e4e4e4] mb-3">Education</h2>
    <ul class="space-y-4">
      {#each education as item}
        <li class="list-item flex items-start justify-between gap-4">
          <div class="flex-1">
            <strong class="text-[#e4e4e4]">{item.institution}</strong> - {item.degree} ({item.period})
          </div>
          {#if item.image}
            <img src={item.image} alt={item.institution} class="ml-16 w-32 h-20 object-cover rounded flex-shrink-0" />
          {/if}
        </li>
      {/each}
    </ul>
  </section>

<section class="my-8">
  <h2 class="text-2xl font-semibold text-[#e4e4e4] mb-3">Work</h2>
  <ul class="space-y-6">
    {#each jobs as job}
      <li class="list-item flex items-start justify-between gap-4">
        <div class="flex-1">
          <a href={job.url} target="_blank" class="text-blue-400 hover:underline">{job.name}</a> <i>{job.extra}</i>
          <div>{job.description}</div>
        </div>
        {#if job.image}
          <img src={job.image} alt={job.name} class="ml-16 w-48 h-32 object-cover rounded flex-shrink-0" />
        {:else}
          <img
            src="/img/projects/empty.png"
            class="media-preview"
          />
        {/if}
      </li>
    {/each}
  </ul>
</section>

<section class="my-8">
  <h2 class="text-2xl font-semibold text-[#e4e4e4] mb-3">Projects</h2>
  <ul class="space-y-6">
    {#each projects as project}
      <li class="list-item">
        <div class="flex-1">
          <span class="title-with-icon">
            <a href={project.url} target="_blank" class="text-blue-400 hover:underline">{project.name}</a>
            {#if project.icon}
              <img src={project.icon} alt="" class="title-icon" />
            {/if}
          </span>
          <div>{project.description}</div>
        </div>

        <!-- Media: prefers video if provided, falls back to image -->
        {#if project.video}
          <video
            class="media-preview"
            autoplay
            muted
            loop
            playsinline
          >
            <source src={project.video} type="video/mp4" />
          </video>
        {:else if project.image}
          <img
            src={project.image}
            alt={project.name}
            class="media-preview"
          />
        {:else}
          <img
            src="/img/projects/empty.png"
            class="media-preview"
          />
        {/if}
      </li>
    {/each}
  </ul>
</section>
  </div>
</div>
