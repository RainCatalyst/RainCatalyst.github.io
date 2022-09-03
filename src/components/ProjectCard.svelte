<script>
    export let title;
    export let description;
    export let image;
    export let hoverImage;
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
    <div class="m-4">
        <span class="font-bold">{title}</span>
        <span class="block text-secondary text-sm">{@html description}</span>
    </div>
</div>