<script>
    import Background from "./components/Background.svelte";
    import Tailwind from "./Tailwind.svelte";
    
    import {Route,router,active} from 'tinro'; 
    import Main from "./pages/Main.svelte";
    import Empty from "./pages/Empty.svelte";
    import Games from "./pages/Games.svelte";
    import GameExample from "./pages/GameExample.svelte";
    import GamesList from "./pages/GamesList.svelte";
    import Work from "./pages/Work.svelte";
    import Art from "./pages/Art.svelte";
    import Transition from "./components/Transition.svelte";

    router.mode.hash();

    // var element = document.documentElement;

    // element.addEventListener('wheel', (event) => {
    //     event.preventDefault();

    //     element.scrollBy({
    //         left: event.deltaY < 0 ? -30 : 30,
    //     });
    // }, {passive:false});
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
        <Route path="/example">
            <div class="content">
                <GameExample/>
            </div>
        </Route>
        <Route path="/work">
            <div class="background"></div>
            <div class="content">
                <Work/>
            </div>
        </Route>
        <Route path="/games">
            <div class="background"></div>
            <div class="content py-10">
                <GamesList/>
            </div>
        </Route>
        <Route path="/vfx">
            <div class="background"></div>
            <div class="content flex flex-row">
                <Art/>
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