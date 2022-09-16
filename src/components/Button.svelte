<script>
    export let text;
    export let href = null;
    export let pressed = false;
</script>

<a class="btn group" href={href} on:click>
    <span>{text}</span>
    {#if pressed}
        <span class="static-underline"></span>
    {:else}
        <span class="animated-underline"></span>
    {/if}
</a>