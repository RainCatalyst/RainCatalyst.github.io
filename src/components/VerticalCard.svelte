<script>
    export let name;
    export let link;
</script>


<div class="flex flex-col border-black border-[1px]">
    <div class="flex flex-col items-start justify-between mx-3 my-3">
        <h1 class="text-box font-semibold">{name}</h1>
    </div>
    <div class="card">
        <video class="w-full h-full" src="{link}" autoplay loop></video>
        <!-- <div style="padding:100% 0 0 0;position:relative;"><iframe src="{link}" frameborder="0" allow="autoplay;" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="{name}"></iframe></div> -->
    </div>
</div>