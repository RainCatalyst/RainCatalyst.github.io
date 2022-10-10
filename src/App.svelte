<script>
    import Header from "./components/Header.svelte";
    import Main from "./pages/Main.svelte";
    import Tailwind from "./Tailwind.svelte";
    import {Route} from 'tinro'; 
    import Empty from "./pages/Empty.svelte";
    import Transition from "./components/Transition.svelte";
</script>
<Tailwind/>

<main>
    <Header/>
    <div class="content pb-8">
        <Transition>
            <Route path="/">
                <Main/>
            </Route>
            <Route path="/portfolio">
                <Empty/>
            </Route>
            <Route path="/contact">
                <Empty/>
            </Route>
        </Transition>
    </div>
</main>