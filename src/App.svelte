<script>
    import Background from "./components/Background.svelte";
    import Tailwind from "./Tailwind.svelte";
    
    import {Route,router,active} from 'tinro'; 
    import Main from "./pages/Main.svelte";
    import Empty from "./pages/Empty.svelte";
    import Transition from "./components/Transition.svelte";

    router.mode.hash();
</script>
<Tailwind/>

<main>
    <Background/>
    <Transition>
        <Route path="/">
            <div class="content">
                <Main/>
            </div>
        </Route>
        <Route path="/work">
            <div class="background">
            </div>
            <div class="content">
                <Empty/>
            </div>
        </Route>
        <Route path="/games">
            <div class="content">
                <Empty/>
            </div>
        </Route>
    </Transition>
    
    
    <!-- <div class="content pb-8">
        <Transition>
            <Route path="/">
                <Main/>
            </Route>
            <Route path="/portfolio">
                <Empty/>
            </Route>
            <Route path="/shaders">
                <Shaders/>
            </Route>
        </Transition>
    </div> -->
</main>