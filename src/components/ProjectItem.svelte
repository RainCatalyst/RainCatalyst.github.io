<script>
    export let title;
    export let img;
    export let href;
    export let description;
    export let meta;

    import NavItem from "./NavItem.svelte";
</script>

<div class="flex flex-row flex-wrap justify-between gap-4 my-4">
    <div class="">
        <NavItem text={title} href={href}/>
        <div class="text-base h-auto w-full text-start leading-relaxed mt-2 font-light">
            {description}<br>
            <b>Role:</b> {meta.role}<br>
            <b>Tools:</b> {meta.tools}<br>
            <b>Team:</b> {meta.teamSize}<br>
            <b>Duration:</b> {meta.timeSpan}<br>
        </div>
    </div>
    <img src={img} class="image-item max-w-[350px] object-cover" alt="">
</div>