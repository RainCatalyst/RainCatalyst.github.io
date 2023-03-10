<script>
    import NavItem from "../components/NavItem.svelte";
    import LinkNavItem from "../components/LinkNavItem.svelte";
    import TextItem from "../components/TextItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="py-16 flex-1 flex flex-col items-stretch justify-start gap-1">
    <div class="text-2xl font-bold mb-2">
        Work and experience
    </div>
    <div class="text-base h-auto w-full text-justify leading-relaxed mb-2 font-light">
        I’m a game programmer with a solid base in computer science supported by practical experience working professionally and participating in game jams.
        <br><br>
        <div class="image-group">
            <img src="img/paleo/game.png" class="image-item">
            <video autoplay muted loop class="image-item">
                <source src="img/paleo/gameplay.mp4" type="video/mp4">
            </video>
        </div>
        <br>
        I'm currently employed as a Gameplay Programmer at <a href="https://italicpig.com/" target="_blank" rel="noopener noreferrer" class="link">Italic Pig</a>, working on the upcoming title <a href="https://store.steampowered.com/app/1202200/Paleo_Pines/" class="link" target="_blank" rel="noopener noreferrer">Paleo Pines</a>. I’m primarily responsible for implementing different gameplay systems, however I often get involved in things outside of programming as well. You can read more about my experience <a href="/italic" class="link">here</a>.
        <br><br>
        <div class="image-group">
            <img src="img/icedrop/logo.png" class="image-item">
            <video autoplay muted loop class="image-item">
                <source src="video/reel_games_hq.mp4" type="video/mp4">
            </video>
        </div>
        <br>
        Previously, we’ve worked on a variety of projects together with my friend (most of which can be seen in the reel on the background). In addition to our <a href="https://freezedice.itch.io/" target="_blank" rel="noopener noreferrer" class="link">game jam projects</a>, we have <a href="https://store.steampowered.com/app/1819520/Constellations_Puzzles_in_the_Sky/" target="_blank" rel="noopener noreferrer" class="link">a released game on Steam</a> and <a href="https://store.steampowered.com/app/2207440/LOK_Digital/" target="_blank" rel="noopener noreferrer" class="link">a demo for our next title</a>. Recently, we’ve established a 2-person game studio, <a href="https://icedropgames.com/" target="_blank" rel="noopener noreferrer" class="link">Icedrop Games</a>. Read more about our projects and my involvement <a href="/games" class="link">here</a>.
    </div>
    <!-- <div class="item-group mt-2 pb-2">
        <LinkNavItem name="company" href="https://italicpig.com/" description={"italic pig"} local=true/>
        <TextItem text="role" extra="gameplay programmer"/>
        <TextItem text="stack" extra="c#, unity3d"/>
        <TextItem text="span" extra="1 year"/>
    </div> -->
    <NavItem text="back" href="/" local=true/>
</div>