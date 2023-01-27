<script>
    import HorizontalCard from "../components/HorizontalCard.svelte";
    import ContactCard from "../components/ContactCard.svelte";
    import {cards, metas} from "../data/projects"
</script>

<div class="pt-5 flex flex-col items-start">
    <h1 class="highlight-text-big">About</h1>
    <div class="self-stretch flex justify-between pt-2 gap-12">
        <div class="text-box basis-3/5">
            Hi, I'm a game programmer with passion for game design. I like to be an active participant in every step of the game development process, and I enjoy sharing my feedback and ideas. I'm excited to continue growing as a game developer and bring my skills and enthusiasm to new projects!
        </div>
        <div class="basis-2/5 aspect-square">
            <img class="w-full h-full card" src="img/logo_new.png" alt="">
        </div>
    </div>
</div>
<div class="mt-8 flex flex-col items-start">
    <h1 id="portfolio" class="highlight-text-big">Work Experience</h1>
    <div class="self-stretch flex flex-col items-stretch mt-4 gap-8">
        <HorizontalCard name="Italic Pig" img="img/italicpig/logo.jpg" href="https://www.italicpig.com/">
            <span slot="description">Gameplay Programmer<br>1 year</span>
        </HorizontalCard>
    </div>
    <!-- <div class="bg-black mx-auto h-[1px] w-[48rem] my-8"></div> -->
    <h1 class="highlight-text-big mt-8">Projects</h1>
    <div class="self-stretch flex flex-col items-stretch mt-4 gap-8">
        {#each {length: 3} as _, i}
            <HorizontalCard name={cards[i].title} img={cards[i].image} href={cards[i].link}>
                <span slot="description">{cards[i].description}</span>
            </HorizontalCard>
        {/each}
        <a href="https://freezedice.itch.io" class="link self-center mt-2">More projects</a>
        <!-- <HorizontalCard name="Constellations" img="img/constellations/logo.png" href="#/constellations">
            <span slot="description">Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi.</span>
        </HorizontalCard> -->
        <!-- <div class="bg-black mx-auto h-[1px] my-2 w-[24rem]"></div> -->
    </div>
    <h1 class="highlight-text-big mt-8" id="contact">Contact</h1>
    <div id="contact" class="self-stretch flex flex-row items-stretch justify-between mt-4">
        <ContactCard name="LinkedIn" href="https://www.linkedin.com/in/arseny-dremin-b74135207/" icon="/img/other/linkedin.svg"/>
        <ContactCard name="Twitter" href="https://twitter.com/freezed_ice" icon="/img/other/twitter.svg"/>
        <ContactCard name="itch.io" href="https://freezedice.itch.io/" icon="/img/other/itchio.svg"/>
        <ContactCard name="Mail" href="mailto:freezedice.business@proton.me" icon="/img/other/mail.svg"/>
    </div>
</div>