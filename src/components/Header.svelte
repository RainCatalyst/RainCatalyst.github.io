<script>
    let y;

    import * as animateScroll from "svelte-scrollto";
    animateScroll.setGlobalOptions({duration: 200});
    // import {tinro-ignore} from 'tinro'; 
</script>

<div class="header">
    <div class="content">
        <div class="flex justify-between">
            <a on:click={() => animateScroll.scrollToTop()}>
                <div class="flex flex-col cursor-pointer">
                    <h4 class="font-bold text-2xl">FreezedIce</h4>
                    <h4 class="font-light">Programmer</h4>
                </div>
            </a>
            <div class="flex items-center gap-4">
                <a class="button" on:click={() => animateScroll.scrollTo({element: '#portfolio', offset: -125})} tinro-ignore>Portfolio</a>
                <a class="button" on:click={() => animateScroll.scrollTo({element: '#contact'})} tinro-ignore>Contact</a>
            </div>
        </div>
    </div>
    <!-- <div class="bg-black mx-auto h-[1px] mt-3 transition-all {y < 50 ? 'w-[48rem]' : 'w-full'}"></div> -->
    <!-- <div class="bg-black mx-auto h-[1px] mt-3 w-full"></div> -->
</div>

<svelte:window bind:scrollY={y} />