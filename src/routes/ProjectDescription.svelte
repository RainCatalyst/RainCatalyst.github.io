<script>
    export let project = {};
    export let params = {}

    import { fly } from 'svelte/transition';
    import { descriptions } from '../data/projects.js'

    project = descriptions[params.index];
</script>

<div class="flex flex-row justify-start items-start gap-5 w-full" in:fly={{ y: 15, duration: 250 }}>
    <div class="flex flex-col gap-4 items-stretch grow-0 basis-1/4">
        <div class="card">
            <video src={project.video} class="h-full object-contain" autoplay muted loop></video>
        </div>
        {#each project.images as src}
            <div class="card">
                <img {src} alt="" class="h-full object-contain">
            </div>
        {/each}
    </div>
    <div class="flex flex-col justify-start items-start gap-5 basis-3/4 md:basis-3/5">
        <h4 class="font-bold text-2xl">{project.title}</h4>
        <div class="text-block">
            <div class="mr-4 ml-1">
                {@html project.description}
            </div>
        </div>
        <h4 class="font-bold text-2xl">Involvement</h4>
        <div class="text-block">
            <div class="mr-4 ml-1">
                {@html project.contribution}
            </div>
        </div>
    </div>
</div>

        <!-- <div class="flex flex-row gap-4 items-stretch basis-1/4">
            <div class="card">
                <video src={project.video} class="h-full object-contain" autoplay muted></video>
            </div>
            {#each project.images as src}
                <div class="card">
                    <img {src} alt="" class="h-full object-contain">
                </div>
            {/each}
        </div> -->