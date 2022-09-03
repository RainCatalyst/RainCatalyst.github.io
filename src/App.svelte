<script>
	import Router from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import {location} from 'svelte-spa-router'

	import Tailwindcss from './Tailwind.svelte';
	import Navbar from './components/Navbar.svelte';

	import ProjectDescription from './routes/ProjectDescription.svelte';
	import About from './routes/About.svelte';
	import Showcase from './routes/Showcase.svelte';

	const routes = {
		'/': Showcase,
		'/about': About,
		'/project/:index': ProjectDescription
	}
</script>
<Tailwindcss/>

<main class="text-primary">
	<div class="flex flex-col">
		<Navbar back={$location != '/'}/>
		<div class="px-8 sm:px-16 pt-8 pb-8 bg-gray-50 grow min-h-screen">
			<Router {routes}/>
		</div>
	</div>
</main>