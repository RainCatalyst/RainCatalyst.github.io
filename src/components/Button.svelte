<script>
    export let text;
    export let href = null;
</script>

<a class="btn group" href={href} on:click>
    <span>{text}</span>
    <span class="animated-underline"></span>
</a>