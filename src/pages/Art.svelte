<script>
    import NavItem from "../components/NavItem.svelte";
    import GameNavItem from "../components/GameNavItem.svelte";
    import TextItem from "../components/TextItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-full flex flex-col items-start justify-center gap-1 flex-1">
    <div class="font-light">
        Links to my vfx projects (both realtime and not) —
    </div>
    <div class="item-group mt-2 pb-2">
        <NavItem text="artstation" href="https://www.artstation.com/raincatalyst"/>
    </div>
    <NavItem text="back" href="/" local=true/>
</div>