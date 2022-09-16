<script>
    import Button from './Button.svelte'

    import { replace } from 'svelte-spa-router'
    import { location } from 'svelte-spa-router'

    // $: back = $location != '/';
</script>

<nav class="flex justify-center mb-2 gap-4">
    <Button text={"Games"} href={"#/"} pressed={$location == "/"}/>
    <h4 class="text-md px-2">|</h4>
    <Button text={"About"} href={"#/about"} pressed={$location == "/about"}/>
</nav>