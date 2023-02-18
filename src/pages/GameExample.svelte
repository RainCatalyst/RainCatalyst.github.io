<script>
    import NavItem from "../components/NavItem.svelte";
    import LinkNavItem from "../components/LinkNavItem.svelte";
    import TextItem from "../components/TextItem.svelte";
    import TextItemSlot from "../components/TextItemSlot.svelte";

    import {cards, metas} from "../data/projects"
</script>

<div class="content-full flex flex-col items-start justify-center gap-1">
    <div class="text-4xl font-bold">
        Constellations
    </div>
    <div class="font-light">
        Minimalist puzzle game about connecting stars.
    </div>
    <div class="item-group mt-2 pb-2">
        <LinkNavItem text="description" extra="" />
        <TextItem text="tools" extra="Godot, Photoshop"/>
        <TextItem text="team" extra="Icedrop Games"/>
        <LinkNavItem name="steam" href="https://store.steampowered.com/app/1819520/Constellations_Puzzles_in_the_Sky/" />
        <LinkNavItem name="itchio" href="https://icedropgames.itch.io/constellations" />
    </div>
    <NavItem text="back" href="/" local=true/>
</div>