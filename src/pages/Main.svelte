<script>
    import NavItem from "../components/NavItem.svelte";
</script>

<div class="content-side select-none">
    <div class="text-3xl font-bold">
        Hi, I'm Arseny.
    </div>
    <div class="font-light text-xl">
        A game programmer and computer science student with a passion for game design and tech art.
    </div>
    <div class="font-light mt-3 text-xl">
        About me —
    </div>
    <div class="item-group text-xl">
        <NavItem text="work and experience" href="/work" local=true/>
        <!-- <NavItem text="experience" href="/experience" local=true/> -->
        <NavItem text="projects" href="/games" local=true/>
    </div>
    <div class="font-light mt-3 text-xl">
        Reach me —
    </div>
    <div class="item-group text-xl">
        <a href="files/CV.pdf" download="ArsenyDremin_CV.pdf" target="_blank" rel="noopener noreferrer">
            <div class="flex flex-row items-start justify-start font-code font-light gap-3">
                <div>
                    >
                </div>
                <div class="flex flex-row items-center gap-3">
                    <div class="link">
                        resume
                    </div>
                </div>
            </div>
        </a>
        <NavItem text="linkedin" href="https://www.linkedin.com/in/arseny-dremin-b74135207"/>
        <NavItem text="github" href="https://github.com/RainCatalyst"/>
        <NavItem text="twitter" href="https://twitter.com/freezed_ice"/>
        <!-- <NavItem text="itch" href="https://freezedice.itch.io"/> -->
    </div>
</div>