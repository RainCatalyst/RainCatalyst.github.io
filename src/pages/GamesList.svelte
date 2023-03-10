<script>
    import NavItem from "../components/NavItem.svelte";
    import ProjectItem from "../components/ProjectItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="py-16 flex-1 flex flex-col items-stretch justify-start gap-1">
    <div class="header-box mb-2">
        Published and work projects
    </div>
    {#each {length: 2} as _, i}
        <ProjectItem title={cards[i].title.toLowerCase()} href={cards[i].link} description={cards[i].description} img={cards[i].image} meta={metas[i]} />
    {/each}
    <div class="header-box mb-2">
        Games from game jams
    </div>
    {#each {length: 5} as _, i}
        <ProjectItem title={cards[i+2].title.toLowerCase()} href={cards[i+2].link} description={cards[i+2].description} img={cards[i+2].image} meta={metas[i+2]} />
    {/each}
    <!-- <div class="item-group mt-2 pb-2 gap-2 w-full">
        {#each {length: 2} as _, i}
            <GameNavItem name={cards[i].title.toLowerCase()} href={cards[i].link} description={cards[i].description.toLowerCase()} img={cards[i].image} meta={metas[i]} local=true/>
        {/each}      
    </div>
    <div class="font-light">
        Other projects —
    </div>
    <div class="item-group mt-2 pb-2 gap-2 w-full">
        <LinkNavItem name="personal" href="https://freezedice.itch.io" description="games from game jams and other related projects" />
    </div> -->
    <NavItem text="back" href="/" local=true/>
</div>