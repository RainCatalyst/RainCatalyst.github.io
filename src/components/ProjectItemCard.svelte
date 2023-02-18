<script>
    export let name;
    export let img;
    export let href;
    export let description;

    import NavItem from "./LinkNavItem.svelte";
</script>


<div class="project-card">
    <!-- <div class="w-full h-full bg-white"></div> -->
    <img class="w-[250px] aspect-video card object-cover" src={img} alt="">
    <div class="font-code text-2xl mt-3">
        {name}
    </div>
    <!-- <div class="card basis-1/2 flex">
        <img class="project-image" src={img} alt="">
    </div>
    <div class="font-code text-2xl mt-3 basis-1/8">
        {name}
    </div>
    <div class="font-code text-xl mt-3 basis-1/6">
        <slot name="description"></slot>
    </div>
    <NavItem text="itch" href="/vfx"/>
    <NavItem text="github" href="/vfx"/> -->
</div>