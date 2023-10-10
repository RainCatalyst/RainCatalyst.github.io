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
        <ProjectItem title={cards[i].title} href={cards[i].link} video={cards[i].hoverImage} description={cards[i].description} img={cards[i].image} source={cards[i].source} meta={metas[i]} />
    {/each}
    <!-- <div class="h-[1px] w-1/2 bg-white rounded-sm mt-8 self-center"></div> -->
    <div class="header-box mb-2 mt-8">
        Personal and game jam games
    </div>
    {#each {length: 6} as _, i}
        <ProjectItem title={cards[i+2].title} href={cards[i+2].link} video={cards[i+2].hoverImage} description={cards[i+2].description} img={cards[i+2].image} source={cards[i+2].source}  meta={metas[i+2]} />
    {/each}
    <!-- <div class="h-[1px] w-1/2 bg-white rounded-sm mt-8 self-center"></div> -->
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