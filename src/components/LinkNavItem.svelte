<script>
    export let name;
    export let img;
    export let href;
    export let description;
</script>

<div class="flex flex-col">
    <a {href} target="_blank" rel="noopener noreferrer">
        <div class="flex flex-row items-start justify-start font-code font-light gap-3 select-none">
            <div>
                >
            </div>
            <div class="link">
                {name}
            </div>
        </div>
    </a>
    {#if description != null}
        <div class="font-code ml-6">
            {description}
        </div>
    {/if}
</div>

