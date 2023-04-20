<script>
    export let text;
    export let href;
    export let local = false;
    export let img;
</script>

{#if local}
    <a {href}>
        <div class="flex flex-row items-start justify-start font-code font-light gap-3 select-none">
            <div>
                >
            </div>
            <div class="flex flex-row gap-3">
                <div class="link">
                    {text}
                </div>
                {#if img != null}
                    <img src={img} class="h-[1em]" alt="">
                {/if}
            </div>
        </div>
    </a>
{:else}
    <a {href} target="_blank" rel="noopener noreferrer">
        <div class="flex flex-row items-start justify-start font-code font-light gap-3 select-none">
            <div>
                >
            </div>
            <div class="flex flex-row items-center gap-3">
                <div class="link">
                    {text}
                </div>
                {#if img != null}
                    <img src={img} class="h-[1em]" alt="">
                {/if}
            </div>
        </div>
    </a>
{/if}
