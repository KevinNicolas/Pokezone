<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";

  import PokemonCard from "~/components/Pokemon-card.component.vue";
  import { useExistentPokemons } from "~/store";

  const existentPokemonsStore = useExistentPokemons();

  function loadMorePokemons() {
    existentPokemonsStore.getNextPage();
  }

  onBeforeMount(async () => {
    if (existentPokemonsStore.pokemonsResult.length) return;
    existentPokemonsStore.getNextPage();
  });

  onMounted(() => {
    document.getElementsByTagName("main")[0].addEventListener("scroll", (event) => console.info(event));
  });
</script>

<template>
  <main class="main-container">
    <div class="header flex-row">
      <h1>Poke-zone</h1>
    </div>
    <span v-if="existentPokemonsStore.isLoading">Cargando...</span>
    <div class="pokemon-container">
      <PokemonCard v-for="(pokemon, index) in existentPokemonsStore.pokemonsResult" :key="pokemon.name" :pokemon-name="pokemon.name" :index="index" />
    </div>
    <div v-if="existentPokemonsStore.isLoading">
      <span>Cargando...</span>
    </div>
    <div class="more-pokemons-container flex-row">
      <button class="more-pokemons" @click="loadMorePokemons">
        <span>Cargar mas pokemons</span>
      </button>
    </div>
  </main>
</template>

<style scoped>
  .header {
    height: 100px;
    align-items: center;
    padding: 0 2ch;
  }

  .main-container {
    padding-bottom: 5vh;
  }

  .pokemon-container,
  .pokemon-page {
    display: flex;
    flex-direction: row;
    gap: 5ch;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }

  .more-pokemons-container {
    justify-content: center;
  }
  .more-pokemons {
    margin: 0 auto;
    padding: 1ch 2ch;
    border-radius: 5px;
    background: orange;
    font-weight: bold;
    font-size: 1.5em;
    color: white;
    transition: all 200ms ease-in-out;
  }
  .more-pokemons:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
  }
</style>
