<script>
    import NavItem from "../components/NavItem.svelte";
</script>

<div class="py-16 flex-1 flex flex-col items-stretch justify-start gap-1">
    <div class="header-box mb-2">
        Paleo Pines
    </div>
    <div class="text-box mb-2">
        My experience working on Paleo Pines.
        <br><br>
        <div class="image-group">
            <img src="img/paleo/game.png" class="image-item">
            <video autoplay muted loop class="image-item">
                <source src="img/paleo/gameplay.mp4" type="video/mp4">
            </video>
        </div>
        <br>
        I'm currently employed as a Gameplay Programmer at <a href="https://italicpig.com/" target="_blank" rel="noopener noreferrer" class="link">Italic Pig</a>, working on the upcoming title <a href="https://store.steampowered.com/app/1202200/Paleo_Pines/" class="link" target="_blank" rel="noopener noreferrer">Paleo Pines</a>. I’m primarily responsible for implementing different gameplay systems, however I often get involved in things outside of programming as well. You can read more about my experience <a href="/italic" class="link">here</a>.
    </div>
    <NavItem text="back" href="/" local=true/>
</div>