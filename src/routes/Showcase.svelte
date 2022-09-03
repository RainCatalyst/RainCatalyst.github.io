<script>
    import ProjectCard from '../components/ProjectCard.svelte';
    import { fly } from 'svelte/transition';

    import { cards } from '../data/projects.js'
</script>

<div in:fly={{ y: 15, duration: 250 }}>
    <h4 class="font-bold text-2xl">Projects</h4>
    <div class="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {#each cards as card, i}
            <ProjectCard {...card} index={i}/>
        {/each}
    </div>
</div>