<style global>

@tailwind base;
@tailwind components;
@tailwind utilities;

body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* background-image: url("../img/background.png"); */
  background-attachment: fixed;
  background-size: cover;
}

main {
  @apply h-screen;
}

.content {
  @apply max-w-[54rem] px-12 mx-auto pt-3 flex flex-col items-stretch gap-3;
}

.highlight-text {
  @apply font-bold text-xl;
}

.highlight-text-big {
  @apply font-bold text-xl;
}

.link {
  @apply text-sm tracking-wider font-bold hover:underline;
}

.text-box {
  @apply text-justify text-lg tracking-wide;
}

.card {
  @apply aspect-video;
}

.header {
  background-image: url("../img/background.png");
  background-attachment: fixed;
  background-size: 100% auto;
  @apply top-0 sticky z-10;
}

.header-sticky {
  @apply top-0 sticky z-10 flex flex-col items-stretch gap-3;
}

.button {
  @apply font-bold tracking-wider cursor-pointer px-1 hover:bg-black hover:text-white;
}

.black-outline {
  @apply outline outline-1 outline-black;
}

@media
(prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

</style>