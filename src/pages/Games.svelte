<script>
    import ProjectItemCard from "../components/ProjectItemCard.svelte";
    import NavItem from "../components/LinkNavItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="project-container">
    <div class="project-column">
        {#each {length: 3} as _, i}
            <ProjectItemCard name={cards[i].title} img={cards[i].image} href={cards[i].link}>
                <span slot="description">{cards[i].description}</span>
            </ProjectItemCard>
        {/each}
    </div>
    <div class="project-column">

    </div>
    <div class="project-column">
        {#each {length: 3} as _, i}
            <ProjectItemCard name={cards[i + 3].title} img={cards[i + 3].image} href={cards[i + 3].link}>
                <span slot="description">{cards[i + 3].description}</span>
            </ProjectItemCard>
        {/each}
    </div>
    <!-- {#each {length: 6} as _, i}
        <ProjectCard name={cards[i].title} img={cards[i].image} href={cards[i].link}>
            <span slot="description">{cards[i].description}</span>
        </ProjectCard>
    {/each} -->
</div>