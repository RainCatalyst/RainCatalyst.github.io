<script>
    export let name;
    export let href;
    export let icon;
</script>

<div class="black-outline p-4 flex flex-row items-center justify-center gap-2 basis-1/5">
    <img src={icon} class="w-4 h-4">
    <a {href} class="contact-link">{name}</a>
</div>
