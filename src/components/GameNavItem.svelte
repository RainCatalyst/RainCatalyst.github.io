<script>
    import NavItem from "../components/NavItem.svelte";
    import LinkNavItem from "../components/LinkNavItem.svelte";
    import TextItem from "../components/TextItem.svelte";

    export let name;
    export let img;
    export let href;
    export let description;
    export let meta;
</script>

<div class="flex flex-row h-[200px] w-full">
    <div class="basis-1/3 mt-2 pb-2 ml-0">
        <LinkNavItem name={name} href={href} description={description} local=true/>
    </div>
    <div class="basis-1/3 mt-2 pb-2">
        <div class="font-code ml-6">
            <!-- <TextItem text="role" extra={meta.role}/>
            <TextItem text="tools" extra={meta.tools}/> -->
                <b>role</b>: {meta.role} <br>
                <b>tools</b>: {meta.tools} <br>
                <b>team</b>: {meta.team}
            </div>

    </div>
    <div class="min-w-[350px] w-[350px] h-[200px] outline outline-1 outline-white">
        <img class="w-full h-full object-cover" src={img} alt="">
    </div>
    <!-- <div class="flex flex-col flex-grow">
        <a {href} target="_blank" rel="noopener noreferrer">
            <div class="flex flex-row items-start justify-start font-code font-light gap-3">
                <div>
                    >
                </div>
                <div class="link">
                    {name}
                </div>
            </div>
        </a>
 
    </div> -->
</div>

