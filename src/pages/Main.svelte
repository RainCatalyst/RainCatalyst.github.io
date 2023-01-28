<script>
    import NavItem from "../components/NavItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-side">
    <div class="text-4xl font-bold">
        Hi, I'm FreezedIce.
    </div>
    <div class="font-light">
        A gameplay programmer with a passion for game design and tech art.
    </div>
    <div class="font-light mt-3">
        Here is what I do —
    </div>
    <div class="item-group">
        <NavItem text="work" href="/work" local=true/>
        <NavItem text="games" href="/games" local=true/>
        <NavItem text="vfx" href="/vfx" local=true/>
    </div>
    <div class="font-light mt-3">
        Reach me —
    </div>
    <div class="item-group">
        <NavItem text="linkedin" href="https://www.linkedin.com/in/arseny-dremin-b74135207"/>
        <!-- <NavItem text="itch" href="https://freezedice.itch.io"/> -->
        <NavItem text="github" href="https://github.com/RainCatalyst"/>
        <NavItem text="twitter" href="https://twitter.com/freezed_ice"/>
    </div>
</div>