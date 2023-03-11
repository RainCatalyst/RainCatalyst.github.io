<script>
    import NavItem from "../components/NavItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-side">
    <div class="text-4xl font-bold">
        Hi, I'm Arseny.
    </div>
    <div class="font-light">
        A gameplay programmer with a passion for game design and tech art.
    </div>
    <div class="font-light mt-3">
        About me —
    </div>
    <div class="item-group">
        <NavItem text="work and experience" href="/work" local=true/>
        <!-- <NavItem text="experience" href="/experience" local=true/> -->
        <NavItem text="projects" href="/games" local=true/>
    </div>
    <div class="font-light mt-3">
        Reach me —
    </div>
    <div class="item-group">
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