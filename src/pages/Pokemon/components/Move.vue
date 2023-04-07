<script setup lang="ts">
  import { onBeforeMount, ref } from "vue";

  import { IPokemonMove } from "~/models";
  import { usePokemonsData } from "~/store";

  const { moveName } = defineProps({
    moveName: {
      type: String,
      required: true,
    },
  });

  const pokemonDataStore = usePokemonsData();
  const moveData = ref<IPokemonMove>();

  onBeforeMount(async () => {
    moveData.value = await pokemonDataStore.getPokemonMove(moveName);
  });
</script>

<template>
  <div v-if="!moveData">
    <span>Cargando... {{ moveName }} {{ moveData }}</span>
  </div>
  <div v-else class="move">
    <h3>{{ moveData.name }}</h3>
    <p>
      {{ (moveData.effect_entries.find(({ language }) => language.name) ?? moveData.effect_entries[0])?.effect ?? "" }}
    </p>
    <span>
      <span class="bolder">Power: </span>
      <span>{{ moveData.power }}</span>
    </span>
    <span>
      <span class="bolder">PP: </span>
      <span>{{ moveData.pp }}</span>
    </span>
  </div>
</template>

<style scoped>
  .move {
    padding-left: 1ch;
  }

  h3 {
    text-transform: capitalize;
  }

  .move p,
  .move span {
    padding-left: 1ch;
    margin: 1ch 0;
  }

  .bolder {
    font-weight: bold;
  }
</style>
