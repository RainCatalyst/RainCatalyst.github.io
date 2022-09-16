<script>
    import Button from './Button.svelte'

    import { replace } from 'svelte-spa-router'
    import { location } from 'svelte-spa-router'

    $: back = $location != '/';
</script>

<nav class="sidebar flex flex-row justify-center items-center">
    <div class="flex justify-start items-center self-stretch cursor-pointer" on:click={() => replace('/')}>
        {#if back}
            <!-- <div class="w-8 h-8 grow-0">
                <img class="h-full" src="img/logo_forward.png" alt="">
            </div> -->
            <span class="btn group ml-2">
                <h4 class="font-bold text-lg">Back</h4>
                <span class="animated-underline-low"></span>
            </span>
        {:else}
            <div class="flex flex-col justify-center items-center">
                <div class="flex flex-row items-center">
                    <div class="w-8 h-8">
                        <img class="h-full" src="img/logo.png" alt="">
                    </div>
                    <!-- <span class="btn group ml-2">
                        <h4 class="font-bold text-lg">FreezedIce</h4>
                        <span class="animated-underline-low"></span>
                    </span> -->
                    <h4 class="font-bold text-lg ml-2">FreezedIce</h4>
                    <h4 class="text-md px-2">/</h4>
                    <h4 class="font-light text-md">Game Portolfio</h4>
                </div>
            </div>
        {/if}
    </div>
    <!-- <div class="flex justify-end items-center gap-4">
        <Button text={"About"} href={"#/about"}/>
    </div> -->
</nav>