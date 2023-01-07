<script>
    export let name;
    export let img;
    export let href;
</script>


<a {href}>
    <div class="flex card cursor-pointer" >
        <div class="aspect-video basis-1/2">
            <img class="w-full h-full object-cover" src={img} alt="">
        </div>
        <div class="basis-1/2 flex flex-col items-start justify-center mx-8 my-8">
            <div>
                <h1 class="highlight-text select-none">{name}</h1>
                <div class="text-box justify-self-between pt-1">
                    <slot name="description"></slot>
                </div>
            </div>
            <!-- <div class="bg-white w-8 h-8"></div> -->
            <!-- <a {href} class="link">More</a> -->
        </div>
    </div>
</a>
<!-- Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi. -->