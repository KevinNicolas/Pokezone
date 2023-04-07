<script setup lang="ts">
  const { color, pildContent } = defineProps({
    pildContent: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="pild" :style="`background: ${color}`">
    <span>{{ pildContent }}</span>
  </div>
</template>

<style scoped>
  .pild {
    color: white;
    border-radius: 10px;
    padding: 1px 1ch;
    font-size: 1.2rem;
    border: 1px solid white;
    text-transform: capitalize;
  }
</style>
