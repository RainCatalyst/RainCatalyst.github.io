<script>
    export let project = {}
    export let meta = {}
    export let params = {}

    import { fly } from 'svelte/transition';
    import { Accordion, AccordionItem } from 'svelte-collapsible'
    import { descriptions, metas } from '../data/projects.js'
    import Button from '../components/Button.svelte'

    project = descriptions[params.index];
    meta = metas[params.index];

    import { onMount } from 'svelte';

    let programming = true;
    function openProgramming() { programming = true; }
    function openDesign() { programming = false; }
    
    // onMount(() => {
    //     document.body.scrollTop = document.documentElement.scrollTop = 0;
    // });
</script>

<div class="flex justify-center" in:fly={{ y: 15, duration: 250 }}>
    <div class="flex flex-col justify-start items-center gap-5 w-full lg:w-1/2">
        <h4 class="font-bold text-2xl">{project.title}</h4>
        <div class="card self-stretch aspect-video">
            <video src={project.video} class="w-full object-contain" autoplay muted loop></video>
        </div>
        <div class="bg-primary self-stretch h-8 flex items-center shadow-md px-4 -mt-5">
            <img src="img/icons/people2.svg" class="w-3 h-3 mr-1" alt="Team Size">
            <h4 class="metadata-description">Team Size: <b>{meta.teamSize}</b></h4>
            <img src="img/icons/tools.svg" class="w-2.5 h-2.5 mr-1 ml-4" alt="Engine">
            <h4 class="metadata-description">Game Engine: <b>{meta.engine}</b></h4>
            <img src="img/icons/clock4.svg" class="w-[0.6875rem] h-[0.6875rem] mr-1 ml-4" alt="Duration">
            <h4 class="metadata-description">Time Frame: <b>{meta.timeSpan}</b></h4>
        </div>
        <div class="text-block self-stretch">
            <div class="mx-3">
                <h4 class="font-bold text-lg mb-3 underline">About</h4>
                {@html project.description}
            </div>
        </div>
        <!-- <div class="text-block self-stretch">
            <div class="mx-3">
                <div class="flex justify-between items-center gap-5 w-full">
                    <Button text={"Programming"} on:click={openProgramming} pressed={programming}/>
                    <Button text={"Design"} on:click={openDesign} pressed={!programming}/>
                </div>
                <h4 class="font-bold text-xl mb-3">About</h4>
                {#if programming}
                    {@html project.description}
                {:else}
                    Bla bla bla
                {/if}
            </div>
        </div> -->
        <Accordion>
            <AccordionItem key="a">
                <div slot="header" class="font-bold text-lg flex flex-col items-center underline">
                    Programming
                    <!-- <img src="img/icons/arrow-down.svg" alt="Open" class="mt-2"> -->
                </div>
                <div slot="body" class="self-stretch mt-3">
                    <div class="mx-3">
                        {@html project.description}
                    </div>
                </div>
            </AccordionItem>
            <AccordionItem key="b">
                <div slot="header" class="font-bold text-lg flex flex-col items-center underline">
                    Design
                    <!-- <img src="img/icons/arrow-down.svg" alt="Open" class="mt-2"> -->
                </div>
                <div slot="body" class="self-stretch mt-3">
                    <div class="mx-3">
                        {@html project.description}
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
        <!-- Images and videos -->
        <!-- <div class="flex flex-row gap-4 self-stretch items-stretch">
            {#each project.images as src}
                <div class="card">
                    <img {src} alt="" class="object-contain">
                </div>
            {/each}
        </div> -->
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