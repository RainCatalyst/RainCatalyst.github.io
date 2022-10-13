<script>
    import VerticalCard from "../components/VerticalCard.svelte";
</script>

<div class="pt-6 flex flex-col items-start">
    <div class="flex gap-2">
        <a class="highlight-text-big underline" href="https://store.steampowered.com/app/1819520/Constellations_Puzzles_in_the_Sky/">Constellations</a>
        <h1 class="highlight-text-big">shaders</h1>
    </div>
    
    <div class="pt-4 self-stretch grid grid-cols-2 gap-8">
        <VerticalCard name="Procedural Background" link="img/shaders/background.mp4"/>
        <VerticalCard name="Swirly Blackhole" link="img/shaders/blackhole.mp4"/>
        <VerticalCard name="World Completion" link="img/shaders/worldcomplete.mp4"/>
        <VerticalCard name="Bubble Line" link="img/shaders/bubbleline.mp4"/>
    </div>
</div>