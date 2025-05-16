<script>
  // Your existing data here
  const profile = {
    name: "Arseny Dremin",
    title: "Software engineer and game programmer.",
    description: "",
    aboutLink: "/about/",
    cvLink: "/files/CV.pdf",
    oldWebsiteLink: "/gamedev"
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
      description: "Customizeable Pathtracing Render Engine made in C++"
    },
    {
      name: "Constellations",
      url: "https://www.nintendo.com/de-de/Spiele/Nintendo-Switch-Download-Software/Constellations-2384059.html",
      description: "A minimalistic puzzle game made in Godot, released on Switch and PC"
    },
    {
      name: "Game Portfolio",
      url: "https://freezedice.itch.io/",
      description: "15+ games of various complexity made by me over the years"
    },
    {
      name: "Arduino Raytracer",
      url: "https://github.com/RainCatalyst/ArduinoRaytracer",
      description: "A simple, but functional raytracing engine made for Arduino"
    },
  ];

  const jobs = [
    {
      name: "C# Gameplay Programmer @ Italic Pig",
      extra: "(2022-2024)",
      url: "https://store.steampowered.com/app/1202200/Paleo_Pines/",
      description: "Worked as a programmer on Paleo Pines, a cute farming simulator game."
    },
    {
      name: "Teaching/Research Assistant @ UdS Computer Graphics Lab",
      extra: "(2024-Now)",
      url: "https://graphics.cg.uni-saarland.de/",
      description: "Previously worked as a tutor, now as a HiWi."
    }
  ];
</script>

<svelte:head>
  <title>{profile.name} - Portfolio</title>
  <meta name="description" content={profile.title} />
</svelte:head>

<div class="min-h-screen min-w-screen bg-[#0d0d0d] text-[#e4e4e4] font-sans flex justify-center items-start py-10 box-border">
  <div class="max-w-3xl w-full px-6">
    <header class="mb-6">
      <h1 class="text-4xl font-semibold text-[#e4e4e4] mb-2">{profile.name}</h1>
      <div class="text-sm text-[#aaa] mb-4 space-x-2">
        <a href={profile.cvLink} download="ArsenyDremin_CV.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">Download CV</a>
        <span>•</span>
        <a href={profile.oldWebsiteLink} class="text-blue-400 hover:underline">Gamedev Portfolio</a>
      </div>
    </header>

    <p class="mb-4 text-[#e4e4e4]">
      {profile.title} {profile.description}
    </p>

    <hr class="border-t border-white my-5" />

    <section class="my-8">
      <h2 class="text-2xl font-semibold text-[#e4e4e4] mb-3">Education</h2>
      <ul class="list-disc pl-8 space-y-2">
        {#each education as item}
          <li>
            <strong class="text-[#e4e4e4]">{item.institution}</strong> - {item.degree} ({item.period})
          </li>
        {/each}
      </ul>
    </section>

    <section class="my-8">
      <h2 class="text-2xl font-semibold text-[#e4e4e4] mb-3">Work</h2>
      <ul class="list-disc pl-8 space-y-2">
        {#each jobs as job}
          <li>
            <a href={job.url} target="_blank" class="text-blue-400 hover:underline">{job.name}</a> <i>{job.extra}</i><br>{job.description}
          </li>
        {/each}
      </ul>
    </section>

    <section class="my-8">
      <h2 class="text-2xl font-semibold text-[#e4e4e4] mb-3">Projects</h2>
      <ul class="list-disc pl-8 space-y-2">
        {#each projects as project}
          <li>
            <a href={project.url} target="_blank" class="text-blue-400 hover:underline">{project.name}</a> - {project.description}
          </li>
        {/each}
      </ul>
    </section>
  </div>
</div>
