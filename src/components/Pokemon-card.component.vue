<script setup lang="ts">
  import { ref, onBeforeMount, Fragment } from "vue";

  import { IPokemonData } from "~/models";
  import { usePokemonsData } from "~/store";

  const props = defineProps({
    pokemonName: {
      required: true,
      type: String,
    },
    index: {
      default: 0,
      type: Number,
    },
  });

  const pokemonDataStore = usePokemonsData();
  const isLoading = ref(true);
  const pokemon = ref<IPokemonData>();

  onBeforeMount(async () => {
    let pokemonData: IPokemonData = pokemonDataStore.obtainPokemonData(props.pokemonName);
    if (!pokemonData) pokemonData = await pokemonDataStore.getPokemonData(props.pokemonName);

    pokemon.value = pokemonData;
    isLoading.value = false;
  });
</script>

<template>
  <div class="pokemon-card-container" :style="`--card-index: ${index}`">
    <span v-if="!pokemon">Cargando</span>
    <div v-else class="pokemon-card">
      <img :src="pokemon.sprites.other?.dream_world.front_default" class="pokemon-img" />
    </div>
  </div>
</template>

<style scoped>
  .pokemon-card-container {
    padding: 1ch;
    width: 240px;
    height: 360px;
    border-radius: 5px;
    background: rgba(0 0 0 / 0.1);
    display: inline-block;
    border: 1px solid orange;
    transition: background 200ms ease-in-out;
    animation: entrance calc(300ms + calc(100ms * var(--card-index))) ease-in-out;
  }
  .pokemon-card-container:hover {
    background: rgba(0 0 0 / 0.8);
  }
  .pokemon-card-container:hover .pokemon-img {
    transform: translateY(-25px);
  }

  .pokemon-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .pokemon-card .pokemon-img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
    transition: all 200ms ease-in-out;
  }

  @keyframes entrance {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
