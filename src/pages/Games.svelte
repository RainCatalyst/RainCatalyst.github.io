<script>
    import ProjectCard from "../components/ProjectCard.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="project-container">
    {#each {length: 6} as _, i}
        <ProjectCard name={cards[i].title} img={cards[i].image} href={cards[i].link}>
            <span slot="description">{cards[i].description}</span>
        </ProjectCard>
    {/each}
</div>