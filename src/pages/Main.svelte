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
        <NavItem text="work" href="/work"/>
        <NavItem text="games" href="/games"/>
        <NavItem text="vfx" href="/vfx"/>
    </div>
    <div class="font-light mt-3">
        Reach me —
    </div>
    <div class="item-group">
        <NavItem text="linkedin" href="/test"/>
        <NavItem text="github" href="/test"/>
        <NavItem text="twitter" href="/test"/>
    </div>
</div>