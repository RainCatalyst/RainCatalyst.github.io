<script>
    import Header from "./components/Header.svelte";
    import Main from "./pages/Main.svelte";
    import Tailwind from "./Tailwind.svelte";
    import {Route,router,active} from 'tinro'; 
    import Empty from "./pages/Empty.svelte";
    import Transition from "./components/Transition.svelte";
    import Shaders from "./pages/Shaders.svelte";

    router.mode.hash();
</script>
<Tailwind/>

<main>
    <Header/>
    <div class="content pb-8">
        <Transition>
            <Route path="/">
                <Empty/>
            </Route>
            <Route path="/portfolio">
                <Empty/>
            </Route>
            <Route path="/contact">
                <Empty/>
            </Route>
            <Route path="/shaders">
                <Shaders/>
            </Route>
        </Transition>
    </div>
</main>