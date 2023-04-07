<script setup lang="ts">
  import { onBeforeMount, ref } from "vue";

  import { IPokemonAbilities } from "~/models";
  import { usePokemonsData } from "~/store";

  const { abilityName } = defineProps({
    abilityName: {
      type: String,
      required: true,
    },
  });

  const pokemonDataStore = usePokemonsData();
  const abilityData = ref<IPokemonAbilities>();

  onBeforeMount(async () => {
    abilityData.value = await pokemonDataStore.getPokemonAbility(abilityName);
  });
</script>

<template>
  <div v-if="!abilityData">
    <span>Cargando...</span>
  </div>
  <div v-else class="ability">
    <h3>{{ abilityData.name }}</h3>
    <p>
      {{ (abilityData.effect_entries.find(({ language }) => language.name === "en") ?? abilityData.effect_entries.find(({ language }) => language.name === "en"))?.effect }}
    </p>
  </div>
</template>

<style scoped>
  .ability {
    padding-left: 1ch;
  }
  .ability p {
    padding-left: 1ch;
  }
</style>
