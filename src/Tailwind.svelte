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
  /* @apply absolute min-w-full min-h-full max-w-none -z-10; */
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -10;
  background-color: rgba(0, 0, 0, 0.75);
}

.video {
  @apply absolute max-w-none -z-10;
  max-width:100%;
  max-height:100%;
  vertical-align: middle;
}

.text-box {
  @apply text-base h-auto w-full text-justify leading-relaxed font-light;
}

.header-box {
  @apply text-2xl font-bold;
}

.image-group {
  @apply flex flex-row flex-wrap justify-center gap-4;
}

.image-item {
  @apply rounded-lg outline-2 outline outline-white max-h-[250px];
}

.content-main {
  @apply w-screen h-auto min-h-screen m-0 md:px-40 px-10 text-2xl flex flex-row;
}

.content-page {
  @apply w-screen h-auto min-h-screen m-0 2xl:px-[500px] lg:px-40 px-10 text-2xl flex flex-row justify-center;
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

.link {
  @apply cursor-pointer hover:underline underline-offset-4 text-rose-200 hover:text-white;
}

@media
(prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

</style>