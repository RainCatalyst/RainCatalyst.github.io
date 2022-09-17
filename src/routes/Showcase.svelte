<script>
    import ProjectCard from '../components/ProjectCard.svelte'
    import { fly } from 'svelte/transition'

    import { cards, metas } from '../data/projects.js'

    import { onMount } from 'svelte'
    
    // onMount(() => {
    //     document.body.scrollTop = document.documentElement.scrollTop = 0;
    // });
</script>

<div class="flex flex-col items-center" in:fly={{ y: 15, duration: 250 }}>
    <!-- <h4 class="font-bold text-2xl">Projects</h4> -->
    <!-- <h4 class="text-xl mb-4">Game Programming and Design Portfolio</h4> -->
    <div class="mt-2 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {#each cards as card, i}
            <ProjectCard {...card} meta={metas[i]} index={i}/>
        {/each}
    </div>
</div>