<script>
    import NavItem from "../components/NavItem.svelte";
    import GameNavItem from "../components/GameNavItem.svelte";
    import TextItem from "../components/TextItem.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-full flex flex-col items-start justify-center gap-1">
    <div class="font-light">
        My job —
    </div>
    <div class="item-group mt-2 pb-2">
        <GameNavItem name="company" href="https://italicpig.com/" description={"italic pig"} local=true/>
        <TextItem text="role" extra="gameplay programmer"/>
        <TextItem text="stack" extra="c#, unity3d"/>
        <TextItem text="span" extra="1 year"/>
    </div>
    <NavItem text="back" href="/" local=true/>
</div>