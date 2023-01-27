<style global>

@tailwind base;
@tailwind components;
@tailwind utilities;
/* @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;700&display=swap"); */
/* @import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"); */

@font-face {
  font-family: "Merriweather";
  src: url("/fonts/Merriweather-Regular.ttf");
}

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
  touch-action: none;
  @apply select-none;
}

main {
  @apply h-full font-main text-white;
}

.background {
  @apply absolute w-auto h-auto min-w-full min-h-full max-w-none -z-10;
}

.content {
  @apply w-screen h-screen m-0 py-20 px-40 text-2xl;
}

.content-side {
  @apply w-1/3 h-full flex flex-col items-start justify-center gap-1;
}

.content-full {
  @apply w-full h-full flex flex-col items-center justify-center;
}

.item-group {
  @apply flex flex-col items-start justify-start ml-6;
}

.highlight-text {
  @apply font-bold text-xl;
}

.highlight-text-big {
  @apply font-bold text-2xl;
}

.link {
  @apply hover:underline underline-offset-4 text-rose-400 hover:text-white;
}

.contact-link {
  @apply tracking-wide font-bold hover:underline underline-offset-4;
}

.text-box {
  @apply text-justify text-lg;
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
  @apply font-bold tracking-wider cursor-pointer px-1 hover:underline underline-offset-4;
}

.card {
  @apply outline outline-1 outline-white overflow-hidden;
}

@media
(prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

</style>