<script>
    export let name;
    export let img;
    export let href;
</script>


<div class="flex black-outline">
    <div class="card basis-1/2 border-black border-r-[1px]">
        <img class="w-full h-full object-cover" src={img} alt="">
    </div>
    <div class="basis-1/2 flex flex-col items-start justify-between mx-8 my-8">
        <div>
            <h1 class="highlight-text hover:underline select-none cursor-pointer">{name}</h1>
            <div class="text-box justify-self-between pt-1">
                <slot name="description"></slot>
            </div>
        </div>
        <!-- <div class="bg-white w-8 h-8"></div> -->
        <a {href} class="link">More ></a>
    </div>
</div>
<!-- Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi. -->