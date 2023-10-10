<script>
    import Background from "./components/Background.svelte";
    import Tailwind from "./Tailwind.svelte";
    
    import {Route,router,active} from 'tinro'; 
    import Main from "./pages/Main.svelte";
    import GamesList from "./pages/GamesList.svelte";
    import Paleo from "./pages/Paleo.svelte";
    import Work from "./pages/Work.svelte";
    import Art from "./pages/Art.svelte";
    import Transition from "./components/Transition.svelte";

    router.mode.hash();
</script>
<Tailwind/>

<main>
    <Background/>
    <Transition>
        <Route path="/">
            <div class="content-main">
                <Main/>
            </div>
        </Route>
        <Route path="/work">
            <div class="background"></div>
            <div class="content-page">
                <Work/>
            </div>
        </Route>
        <Route path="/games">
            <div class="background"></div>
            <div class="content-page">
                <GamesList/>
            </div>
        </Route>
        <Route path="/art">
            <div class="background"></div>
            <div class="content-page">
                <Art/>
            </div>
        </Route>
        <Route path="/paleo">
            <div class="background"></div>
            <div class="content-page">
                <Paleo/>
            </div>
        </Route>
    </Transition>
</main>