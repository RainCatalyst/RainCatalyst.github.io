<script>
    export let project = {};
    export let params = {}

    import { fly } from 'svelte/transition';
    import { descriptions } from '../data/projects.js'

    project = descriptions[params.index];
</script>

<div class="flex justify-center" in:fly={{ y: 15, duration: 250 }}>
    <div class="flex flex-col justify-start items-center gap-5 w-full lg:w-1/2">
        <h4 class="font-bold text-2xl">{project.title}</h4>
        <div class="card self-stretch aspect-video">
            <video src={project.video} class="w-full object-contain" autoplay muted loop></video>
        </div>
        <div class="text-block self-stretch">
            <div class="mr-4 ml-1">
                {@html project.description}
            </div>
        </div>
        <!-- Images and videos -->
        <div class="flex flex-row gap-4 self-stretch items-stretch">
            {#each project.images as src}
                <div class="card">
                    <img {src} alt="" class="object-contain">
                </div>
            {/each}
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