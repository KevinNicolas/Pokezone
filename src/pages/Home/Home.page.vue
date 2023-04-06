<script setup lang="ts">
  import { onBeforeMount } from "vue";

  import PokemonCard from "~/components/Pokemon-card.component.vue";
  import { useExistentPokemons } from "~/store";

  const existentPokemonsStore = useExistentPokemons();

  function loadMorePokemons() {
    existentPokemonsStore.getNextPage();
  }

  onBeforeMount(async () => {
    existentPokemonsStore.getNextPage();
  });
</script>

<template>
  <main>
    <span v-if="existentPokemonsStore.isLoading">Cargando...</span>
    <div class="pokemon-container">
      <PokemonCard v-for="(pokemon, index) in existentPokemonsStore.pokemonsResult" :key="pokemon.name" :pokemon-name="pokemon.name" :index="index" />
      <!-- TODO Load card -->
    </div>
    <div v-if="existentPokemonsStore.isLoading">
      <span>Cargando...</span>
    </div>
    <button @click="loadMorePokemons" style="margin: 0 auto">
      <span>Cargar mas pokemons</span>
    </button>
  </main>
</template>

<style scoped>
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
</style>
