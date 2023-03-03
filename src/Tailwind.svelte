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
  @apply select-none bg-black;
}

main {
  overflow: hidden;
  overflow-y: scroll;
  /* white-space: nowrap; */
  @apply relative font-main text-white h-screen w-auto bg-black bg-opacity-40;
}

.background {
  @apply absolute w-auto h-auto min-w-full min-h-full max-w-none -z-10;
  background-color: rgba(0, 0, 0, 0.65);
}

.video {
  @apply absolute max-w-none -z-10;
  max-width:100%;
  max-height:100%;
  vertical-align: middle;
}

.content {
  @apply w-screen min-h-screen h-auto m-0 md:px-40 px-10 text-2xl flex items-center flex-row;
}

.content-screen {
  @apply w-screen h-[500px] m-0 py-0 md:px-40 px-10 text-2xl;
}

.content-nopad {
  @apply w-screen h-auto min-h-screen m-0 py-10 md:px-40 px-6 text-2xl;
}

.project-column {
  @apply basis-1/3 px-4 item-group;
}

.project-card {
  @apply flex flex-col justify-center p-4 w-full overflow-hidden;
}

.project-image {
  @apply card w-full aspect-video object-cover;
}

.project-container {
  @apply content-full flex flex-row;
}

.content-side {
  @apply md:w-1/3 w-2/3 h-auto flex flex-col items-start justify-center gap-1;
}

.content-full {
  @apply w-full h-full;
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
  @apply cursor-pointer hover:underline underline-offset-4 text-rose-200 hover:text-white;
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