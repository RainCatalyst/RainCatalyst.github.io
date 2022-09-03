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
}

/* a {
  @apply underline tracking-wider font-bold text-sm;
} */

.title {
  @apply bg-white font-bold text-2xl border-primary border-l-[3px] shadow-sm px-3 py-1;
}

.text-block {
  @apply bg-white border-primary border-l-[3px] shadow-sm px-3 py-3;
}

.card {
    @apply bg-white rounded shadow-sm overflow-hidden;
}

.card-animated {
    @apply card cursor-pointer -translate-y-0 hover:-translate-y-1 hover:shadow-lg transition-all;
}

.btn {
    @apply rounded-full text-sm font-bold cursor-pointer tracking-wider relative;
}

.animated-underline {
    @apply absolute -bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all group-hover:w-full;
}

.animated-underline-low {
    @apply absolute bottom-[4px] left-0 w-0 h-[1.5px] bg-primary transition-all group-hover:w-full;
}

.sidebar {
    @apply h-14 px-8 sm:px-16 grow-0 top-0 select-none sticky z-10 shadow-sm bg-white;
}

@media
(prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

</style>