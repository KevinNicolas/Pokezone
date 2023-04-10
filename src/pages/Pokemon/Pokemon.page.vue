<script setup lang="ts">
  import { onBeforeMount, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import Pild from "~/components/Pild.vue";
  import Arrowback from "~/components/Icons/Arrow-back.component.vue";

  import { IPokemonData } from "~/models";
  import { getColorByPokemonType } from "~/utils";
  import { usePokemonsData } from "~/store";

  import Move from "./components/Move.vue";
  import Ability from "./components/Abilities.vue";

  const pokemonDataStore = usePokemonsData();
  const route = useRoute();
  const router = useRouter();

  const pokemon = ref<IPokemonData>();

  const goBack = () => {
    router.replace("/");
  };

  onBeforeMount(async () => {
    const pokemonName: string = route.params.pokemonName as string;

    if (!pokemonName) {
      router.replace("/");
      return;
    }

    pokemon.value = await pokemonDataStore.getPokemonData(pokemonName);
  });
</script>

<template>
  <div v-if="!pokemon">
    <span>Cargando</span>
  </div>
  <main v-else>
    <button class="back-button" @click="goBack">
      <Arrowback :size="50" />
    </button>
    <div class="pokemon-info flex-row">
      <div class="pokemon-image" :style="`background: ${getColorByPokemonType(pokemon.types[0].type.name)}`">
        <img :src="pokemon.sprites.other?.dream_world.front_default" :alt="pokemon.name" />
      </div>
      <div class="basic-info">
        <h1>{{ pokemon.name }}</h1>
        <div class="pokemon-types flex-row">
          <Pild v-for="({ type }, index) in pokemon.types" :key="index" :pild-content="type.name" :color="getColorByPokemonType(type.name)" />
        </div>
        <div class="pokemon-stats flex-row">
          <div class="stat" v-for="(stat, index) in pokemon.stats" :key="index">
            <span>{{ stat.stat.name }}:</span>
            <span>{{ stat.base_stat }}</span>
          </div>
          <div class="stat">
            <span>Weight:</span>
            <span>{{ pokemon.weight }}</span>
          </div>
          <div class="stat">
            <span>Height:</span>
            <span>{{ pokemon.height }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="moves">
      <h2>Moves</h2>
      <Move v-for="({ move }, index) in pokemon.moves" :key="index" :move-name="move.name" />
    </div>
    <div class="abilities">
      <h2>Abilities</h2>
      <Ability v-for="({ ability }, index) in pokemon.abilities" :key="index" :ability-name="ability.name" />
    </div>
  </main>
</template>

<style scoped>
  main {
    padding-bottom: 200px;
  }

  h2 {
    color: yellow;
  }

  .back-button {
    color: white;
    background: transparent;
    position: fixed;
    top: 10px;
    left: 25px;
    cursor: pointer;
    z-index: 999;
  }

  .pokemon-info {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  }

  .pokemon-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    transform: translate(-100px, -100px);
    animation: entrance 200ms ease-in-out;
  }

  .pokemon-image img {
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 300px;
    object-fit: contain;
    transform: translate(25px, 25px);
  }

  .basic-info {
    display: flex;
    flex-direction: column;
    width: calc(100% - 500px);
    height: 500px;
    padding-top: 2ch;
    gap: 3ch;
    margin: 0 auto;
  }

  .basic-info h1 {
    text-transform: capitalize;
    font-size: 3em;
  }

  .pokemon-types {
    gap: 2ch;
  }

  .pokemon-stats {
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 2ch;
  }

  .pokemon-stats .stat {
    margin-top: 1ch;
  }
  .pokemon-stats .stat span:first-child {
    text-transform: capitalize;
    font-weight: bold;
    margin-right: 1ch;
  }

  .moves,
  .abilities {
    display: flex;
    flex-direction: column;
    gap: 3ch;
    padding-left: 2ch;
    display: flex;
    flex-direction: column;
  }

  .moves h2 {
    font-size: 2em;
  }

  .abilities {
    margin-top: 5ch;
  }

  @media screen and (max-width: 850px) {
    .basic-info {
      width: 100%;
      padding: 0 2ch;
    }

    .pokemon-image {
      margin: 0 auto;
      min-width: calc(100% + 200px);
      min-height: 700px;
      transform: translate(-100px, -300px);
    }

    .pokemon-image img {
      transform: translateY(150px);
    }
  }

  @media screen and (max-width: 550px) {
    .pokemon-image {
      margin: 0 auto;
      min-width: calc(100% + 200px);
      min-height: 700px;
      transform: translate(-100px, -300px);
    }

    .pokemon-image img {
      transform: translateY(150px);
    }

    .basic-info h1 {
      font-size: 10vw;
    }
  }
</style>
