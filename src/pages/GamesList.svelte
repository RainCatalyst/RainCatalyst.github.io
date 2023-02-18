<script>
    import NavItem from "../components/NavItem.svelte";
    import GameNavItem from "../components/GameNavItem.svelte";
    import ProjectCard from "../components/ProjectCard.svelte";
    import TextItemSlot from "../components/TextItemSlot.svelte";
    import LinkNavItem from "../components/LinkNavItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-full flex flex-col items-start justify-center gap-1">
    <div class="font-light">
        Published and work projects —
    </div>
    <div class="item-group mt-2 pb-2 gap-2 w-full">
        {#each {length: 2} as _, i}
            <GameNavItem name={cards[i].title.toLowerCase()} href={cards[i].link} description={cards[i].description.toLowerCase()} img={cards[i].image} meta={metas[i]} local=true/>
        {/each}      
    </div>
    <div class="font-light">
        Other projects —
    </div>
    <div class="item-group mt-2 pb-2 gap-2 w-full">
        <LinkNavItem name="personal" href="https://freezedice.itch.io" description="games from game jams and other related projects" />
        <!-- <GameNavItem name="personal projects" href={cards[2].link} description="game jams and other personal projects" img={cards[0].image} meta={metas[0]} local=true/> -->
    </div>
    <NavItem text="back" href="/" local=true/>
</div>