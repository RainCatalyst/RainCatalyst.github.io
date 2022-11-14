<script>
    import HorizontalCard from "../components/HorizontalCard.svelte";
</script>

<div class="pt-6 flex flex-col items-start">
    <h1 class="highlight-text-big">About</h1>
    <div class="self-stretch flex justify-between pt-2 gap-12">
        <div class="text-box basis-3/5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut sollicitudin mi. Integer rhoncus fringilla nulla, id malesuada urna. Nunc molestie metus id ipsum facilisis, cursus efficitur nisi mollis. Aenean vel hendrerit magna, tristique posuere felis. Cras a nisl id elit rutrum viverra in a libero. Fusce dapibus lorem eget porta molestie. Morbi nec urna eleifend, imperdiet ante eget, mollis augue. Curabitur ut dignissim erat.
        </div>
        <div class="basis-2/5 aspect-square">
            <img class="w-full h-full border-black border-[1px]" src="img/sample.jpg" alt="">
        </div>
    </div>
</div>
<div class="mt-8 flex flex-col items-start">
    <h1 class="highlight-text-big">Work Experience</h1>
    <div class="self-stretch flex flex-col items-stretch mt-4 gap-8">
        <HorizontalCard name="Italic Pig" img="img/italicpig/logo.jpg" href="#/italicpig">
            <span slot="description">Unity Developer<br>1 year</span>
        </HorizontalCard>
    </div>
    <!-- <div class="bg-black mx-auto h-[1px] w-[48rem] my-8"></div> -->
    <h1 class="highlight-text-big mt-8">Projects</h1>
    <div class="self-stretch flex flex-col items-stretch mt-4 gap-8">
        <HorizontalCard name="Constellations" img="img/constellations/logo.png" href="#/constellations">
            <span slot="description">Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi.</span>
        </HorizontalCard>
        <HorizontalCard name="Flip'n Seas" img="img/flipseas/logo.png" href="#/constellations">
            <span slot="description">Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi.</span>
        </HorizontalCard>
        <!-- <div class="bg-black mx-auto h-[1px] my-2 w-[24rem]"></div> -->
    </div>
</div>