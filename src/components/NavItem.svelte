<script>
    export let text;
    export let href;
    export let local = false;
</script>

{#if local}
    <a {href}>
        <div class="flex flex-row items-start justify-start font-code font-light gap-3">
            <div>
                >
            </div>
            <div class="link">
                {text}
            </div>
        </div>
    </a>
{:else}
    <a {href} target="_blank" rel="noopener noreferrer">
        <div class="flex flex-row items-start justify-start font-code font-light gap-3">
            <div>
                >
            </div>
            <div class="link">
                {text}
            </div>
        </div>
    </a>
{/if}
