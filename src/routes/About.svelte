<script>
    import { fly } from 'svelte/transition';
</script>

<div class="flex flex-row justify-start items-start gap-5 w-full" in:fly={{ y: 15, duration: 250 }}>
    <div class="flex flex-col justify-start items-start gap-5 basis-3/4 md:basis-3/5">
        <h4 class="font-bold text-2xl">About</h4>
        <div class="text-block">
            <div class="mr-4 ml-1">
                Hi! I'm Arseny (FreezedIce on the web).
                <br>
                <!-- Currently, I'm studying at <a href="">Futuregames</a> Sweden as a Game Programmer.<br>
                Prior to that, I was studying Computer Science at <bold>Innopolis University</bold>, Russia.<br>
                <br> -->
                <br>
                I like making fun small games and I actively participate in game jams around the world.
            </div>
        </div>
    </div>
</div>
