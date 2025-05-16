<script>
  import { Route } from 'tinro';

  import Background from "./components/Background.svelte";
  import Transition from "./components/Transition.svelte";

  import Main from "./pages/Main.svelte";
  import GamesList from "./pages/GamesList.svelte";
  import Paleo from "./pages/Paleo.svelte";
  import Work from "./pages/Work.svelte";
  import Art from "./pages/Art.svelte";
</script>

<main>
  <Background />

  <Transition>
    <!-- Relative routes within /test -->
    <Route path="/">
      <Main />
    </Route>

    <Route path="work">
      <Work />
    </Route>

    <Route path="games">
      <GamesList />
    </Route>

    <Route path="art">
      <Art />
    </Route>

    <Route path="paleo">
      <Paleo />
    </Route>
  </Transition>
</main>
