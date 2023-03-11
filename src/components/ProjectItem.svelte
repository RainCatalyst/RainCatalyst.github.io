<script>
    export let title;
    export let img;
    export let href;
    export let video;
    export let description;
    export let source;
    export let local = false;
    export let meta;

    let hovered = false

    import NavItem from "./NavItem.svelte";
</script>

<div class="flex flex-row flex-wrap justify-between gap-4 my-4" on:mouseenter={() => {
            hovered = true;
            }
        }
        on:mouseleave={() => {
                hovered = false;
        }}>
    <div class="">
        <NavItem text={title} href={href} local={href.startsWith("#")} img={source} />
        <div class="text-base h-auto w-full text-start leading-relaxed mt-2 font-light">
            {description}<br><br>
            <b>Role:</b> {meta.role}<br>
            <b>Tools:</b> {meta.tools}<br>
            <b>Team:</b> {meta.teamSize}<br>
            <b>Duration:</b> {meta.timeSpan}<br>
        </div>
    </div>
    {#if video==null || video==""}
        <img src={img} class="image-item max-w-[350px] object-cover mt-2" alt="">
    {:else}
        <video autoplay muted loop class="image-item max-w-[350px] object-cover mt-2">
            <source src={video} type="video/mp4">
        </video>
    {/if}
</div>