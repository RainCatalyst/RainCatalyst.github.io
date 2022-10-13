<script>
    import Youtube from "svelte-youtube-embed";
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
<div class="pt-8 flex flex-col items-start">
    <h1 class="highlight-text-big">Projects</h1>
    <div class="self-stretch flex flex-col items-stretch pt-4 gap-8">
        <div class="flex border-black border-[1px]">
            <div class="card basis-1/2">
                <img class="w-full h-full object-cover" src="img/constellations/logo.png" alt="">
            </div>
            <div class="basis-1/2 flex flex-col items-start justify-between mx-8 my-8">
                <div>
                    <h1 class="highlight-text hover:underline select-none cursor-pointer">Constellations</h1>
                    <div class="text-box justify-self-between pt-1">
                        Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi.
                    </div>
                </div>
                <!-- <div class="bg-white w-8 h-8"></div> -->
                <a href="/constellations" class="link">More ></a>
            </div>
        </div>
        <!-- <div class="bg-black mx-auto h-[1px] my-2 w-[24rem]"></div> -->
    </div>
    <div class="self-stretch flex flex-col items-stretch pt-4 gap-8">
        <div class="flex border-black border-[1px]">
            <div class="card basis-1/2">
                <!-- <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="788.54" height="443" type="text/html" src="https://www.youtube.com/embed/DBXH9jJRaDk?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com"><div><small><a href="https://youtubeembedcode.com/pl/">youtubeembedcode pl</a></small></div><div><small><a href="https://theimpossiblequiz.info/the-impossible-quiz-demo/">the impossible quiz demo</a></small></div><div><small><a href="https://youtubeembedcode.com/en">youtubeembedcode en</a></small></div><div><small><a href="https://skattefrittcasino.com/">casino utan skatt</a></small></div></iframe> -->
                <!-- <Youtube id="aag4C4sQ-DQ" /> -->
                <img class="w-full h-full object   -cover" src="img/flipseas/logo.png" alt="">
            </div>
            <div class="basis-1/2 flex flex-col items-start justify-between mx-8 my-8">
                <div>
                    <h1 class="highlight-text hover:underline select-none cursor-pointer">Flip'n Seas</h1>
                    <div class="text-box justify-self-between pt-1">
                        Flip’n Seas is a puzzle about flipping tiles to lead your ship to a treasure.
                    </div>
                </div>
                <!-- <div class="bg-white w-8 h-8"></div> -->
                <a href="/constellations" class="link">More ></a>
            </div>
        </div>
        <!-- <div class="bg-black mx-auto h-[1px] my-2 w-[24rem]"></div> -->
    </div>
</div>