<script>
    import NavItem from "../components/NavItem.svelte";
    import GameNavItem from "../components/GameNavItem.svelte";
    import ProjectCard from "../components/ProjectCard.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-full flex flex-col items-start justify-center gap-1">
    <div class="font-light">
        We make games with my friend during our free time. <br>I was responsible for coding and co-designing those games —
    </div>
    <div class="w-full flex flex-row flex-wrap">
        <div class="item-group mt-2 pb-2">
            {#each {length: 3} as _, i}
                <GameNavItem name={cards[i].title.toLowerCase()} href={cards[i].link} description={cards[i].description.toLowerCase()} local=true/>
            {/each}      
        </div>
        <div class="item-group mt-2 pb-2">
            {#each {length: 3} as _, i}
                <GameNavItem name={cards[i + 3].title.toLowerCase()} href={cards[i + 3].link} description={cards[i + 3].description.toLowerCase()} local=true/>
            {/each}      
        </div>
    </div>
    <NavItem text="back" href="/" local=true/>
</div>