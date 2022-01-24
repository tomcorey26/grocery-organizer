<template>
  <div
    class="px-2 py-3 max-w-md mx-auto t-card flex justify-between space-x-4 w-full text-white"
  >
    <div>
      <div class="w-full h-6" :class="[color]"></div>
      <div class="text-xl font-medium">{{ name }}</div>
      <p class="opacity-60">{{ category }}</p>
    </div>
    <div class="text-gray-500">
      <span @click="$emit('increment')">^</span>
      <p>{{ count }}</p>
      <span @click="$emit('decrement')">v</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FoodItem } from '@/types/food';

export default defineComponent({
  props: {
    name: String as PropType<FoodItem['name']>,
    count: Number as PropType<FoodItem['count']>,
    category: String as PropType<FoodItem['category']>,
    color: String,
  },
  setup(props) {
    return {};
  },
});
</script>
<style lang=""></style>
