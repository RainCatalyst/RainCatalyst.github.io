<script>
    export let name;
    export let href;
    export let link;
    export let description;
</script>


<div class="card flex flex-col">
    <div class="aspect-video">
        <img href={href} alt="">
    </div>
    <div class="text-box font-semibold">{name}</div>
    <!-- <div class="flex flex-col items-start justify-between mx-3 my-3">
        <h1 class="text-box font-semibold">{name}</h1>
    </div> -->
</div>