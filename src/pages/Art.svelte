<script>
    import NavItem from "../components/NavItem.svelte";
    import ProjectItem from "../components/ProjectItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="py-16 flex-1 flex flex-col items-stretch justify-start gap-1">
    <div class="header-box mb-2 mt-8">
        Technical Art
    </div>
    <div class="flex flex-row flex-wrap justify-between gap-4 my-4">
        <div class="">
            <NavItem text="Visual Effects" href="https://www.artstation.com/raincatalyst" />
            <div class="text-base h-auto w-full text-start leading-relaxed mt-2 font-light">
                Artstation portfolio featuring a mix of realtime and film VFX<br><br>
                <b>Tools:</b> Unity, Houdini, Blender
            </div>
        </div>
            <img src="img/art/vfx.png" class="image-item max-w-[350px] object-cover mt-2" alt="">
    </div>
    <div class="flex flex-row flex-wrap justify-between gap-4 my-4">
        <div class="">
            <NavItem text="Compute Shaders" href="https://twitter.com/freezed_ice/status/1375451078699929600?s=20" />
            <div class="text-base h-auto w-full text-start leading-relaxed mt-2 font-light">
                Slime mold simulation using Compute Shaders in Unity<br><br>
                <b>Tools:</b> Unity, HLSL
            </div>
        </div>
        <video autoplay muted loop class="image-item max-w-[350px] object-cover mt-2">
            <source src="img/art/slime.mp4" type="video/mp4">
        </video>
    </div>
    <NavItem text="back" href="/" local=true/>
</div>