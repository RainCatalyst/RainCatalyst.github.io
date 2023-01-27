<script>
    export let name;
    export let img;
    export let href;
    export let description;

    import NavItem from "../components/NavItem.svelte";
</script>


<div class="flex flex-col basis-1/4 h-1/2 p-4">
    <!-- <div>??</div> -->
    <div class="card basis-1/2">
        <img class="w-full h-full object-cover" src={img} alt="">
    </div>
    <div class="font-code text-2xl mt-3 basis-1/8">
        {name}
    </div>
    <div class="font-code text-xl mt-3 basis-1/6">
        <slot name="description"></slot>
    </div>
    <NavItem text="itch" href="/vfx"/>
    <NavItem text="github" href="/vfx"/>
</div>