<script>
    let y;
    // import {tinro-ignore} from 'tinro'; 
</script>

<div class="header">
    <div class="content">
        <div class="flex justify-between">
            <a href="/">
                <div class="flex flex-col">
                    <h4 class="font-bold text-2xl">FreezedIce</h4>
                    <h4 class="font-light">Programmer</h4>
                </div>
            </a>
            <div class="flex items-center gap-4">
                <a class="button" href="#/portfolio" tinro-ignore>Portfolio</a>
                <a class="button" href="#contact" tinro-ignore>Contact</a>
            </div>
        </div>
    </div>
    <!-- <div class="bg-black mx-auto h-[1px] mt-3 transition-all {y < 50 ? 'w-[48rem]' : 'w-full'}"></div> -->
    <div class="bg-black mx-auto h-[1px] mt-3 w-full"></div>
</div>

<svelte:window bind:scrollY={y} />