<script>
    export let name;
    export let link;
</script>


<!-- border-black border-[1px] -->
<div class="flex flex-col card">
    <div class="flex flex-col items-start justify-between mx-3 my-3">
        <h1 class="text-box font-semibold">{name}</h1>
    </div>
    <div class="aspect-video box-border">
            <iframe class="w-full aspect-square" src="https://www.youtube.com/embed/{link}?playlist={link}&loop=1&theme=light&color=white&autoplay=1&keyboard=1&autohide=2&modestbranding=1&fs=0&showinfo=0&controls=0&rel=0&mute=1&enablejsapi=1"frameborder="0"></iframe>
        <!-- </div> -->
        <!-- <video class="w-full h-full" src="{link}" autoplay loop></video> -->
        <!-- <div style="padding:100% 0 0 0;position:relative;"><iframe src="{link}" frameborder="0" allow="autoplay;" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="{name}"></iframe></div> -->
    </div>
</div>