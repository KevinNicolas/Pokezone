<script setup lang="ts">
  import { ref, onBeforeMount } from "vue";
  import { useRouter } from "vue-router";

  import Pild from "~/components/Pild.vue";

  import { IPokemonData } from "~/models";
  import { usePokemonsData } from "~/store";
  import { getColorByPokemonType } from "~/utils";

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

  const router = useRouter();
  const pokemonDataStore = usePokemonsData();

  const isLoading = ref(true);
  const pokemon = ref<IPokemonData>();

  const goToPokemonInfo = () => {
    if (!pokemon.value?.name) return;
    router.push(`/${pokemon.value.name}`);
  };

  onBeforeMount(async () => {
    let pokemonData: IPokemonData = pokemonDataStore.obtainPokemonData(props.pokemonName);
    if (!pokemonData) pokemonData = await pokemonDataStore.getPokemonData(props.pokemonName);

    pokemon.value = pokemonData;
    isLoading.value = false;
  });
</script>

<template>
  <div
    class="pokemon-card-container"
    :style="`--card-index: ${Math.min(index, 15)}; border: 1px solid ${getColorByPokemonType(pokemon?.types[0].type.name ?? '')};`"
    @click="goToPokemonInfo"
  >
    <span v-if="!pokemon">Cargando</span>
    <div v-else class="pokemon-card">
      <img :src="pokemon.sprites.other?.dream_world.front_default" class="pokemon-img" />
      <h3 class="text">{{ pokemon.name }}</h3>
      <div class="pokemon-types">
        <Pild v-for="({ type }, index) in pokemon.types" :key="index" :pild-content="type.name" :color="getColorByPokemonType(type.name)" />
      </div>
      <span>{{ pokemon.weight / 10 }} kgs</span>
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
    transition: all 200ms ease-in-out;
    animation: entrance calc(300ms + calc(100ms * var(--card-index))) ease-in-out;
  }
  .pokemon-card-container:hover {
    background: rgba(0 0 0 / 0.8);
    transform: scale(1.1);
  }
  .pokemon-card-container:hover .pokemon-img {
    transform: translateY(-25px);
  }

  .pokemon-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2ch;
  }

  .pokemon-card > h3,
  .pokemon-card > span {
    text-transform: capitalize;
    text-align: center;
  }

  .pokemon-card .pokemon-img {
    width: auto;
    max-width: 100%;
    height: 220px;
    object-fit: contain;
    transition: all 200ms ease-in-out;
  }

  .pokemon-types {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    overflow-x: hidden;
    width: 100%;
    height: fit-content;
  }
</style>
