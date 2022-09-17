<script>
    export let title;
    export let description;
    export let image;
    export let hoverImage;
    export let meta;
    export let index;

    import { replace } from 'svelte-spa-router'
    import { fade } from 'svelte/transition';

    let currentImage = image;
    let hovered = false;

    function onHover() { hovered = true; };
    function onDehover() { hovered = false; };
    function select() { replace('/project/' + index) };
</script>

<div class="card-animated" on:click={select} on:mouseenter={onHover} on:mouseleave={onDehover}>
    <!-- <img src={currentImage} alt="" class="w-full h-32 sm:h-48 object-cover"> -->
    {#if hovered }
        <video src={hoverImage} class="w-full aspect-video object-cover" autoplay muted loop ></video>
    {:else}
        <img src={image} alt="" class="w-full aspect-video object-cover">
    {/if}
    <!-- <div class="w-full aspect-video object-cover relative">
        {#if hovered}
            <video src={hoverImage} class="w-full h-full" autoplay muted loop ></video>
        {:else}
            <img src={image} alt="" class="w-full h-full">
        {/if}
        <div class="absolute bottom-0 h-6 w-full bg-primary/50 flex items-center">
            <img src="img/icons/tools2.svg" class="w-3 h-3 mr-1 ml-2" alt="Engine">
            <span class="font-light text-sm text-white">Unity</span>
        </div>
    </div> -->
    <div class="bg-primary w-full h-8 flex items-center shadow-md px-4">
        <img src="img/icons/people2.svg" class="w-3 h-3 mr-1" alt="Team Size">
        <h4 class="metadata-description">{meta.teamSize}</h4>
        <img src="img/icons/tools.svg" class="w-2.5 h-2.5 mr-1 ml-4" alt="Engine">
        <h4 class="metadata-description">{meta.engine}</h4>
        <img src="img/icons/clock4.svg" class="w-[0.6875rem] h-[0.6875rem] mr-1 ml-4" alt="Duration">
        <h4 class="metadata-description">{meta.timeSpan}</h4>
    </div>
    <div class="mx-4 mb-4 mt-3">
        <div class="flex items-center">
            <span class="font-bold mr-3">{title}</span>
        </div>
        <span class="block text-secondary text-sm">{@html description}</span>
    </div>
</div>