<script>
    export let text;
</script>

<div class="flex flex-col">
    <div class="flex flex-row items-start justify-start font-code font-light gap-3">
        <div>
            >
        </div>
        <div>
            {text}
        </div>
    </div>
    <div class="font-code ml-6">
        <slot name="description"></slot>
    </div>
</div>
