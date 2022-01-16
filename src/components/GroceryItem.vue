<template>
  <div
    class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg flex justify-between space-x-4 w-full"
  >
    <div>
      <div class="text-xl font-medium text-black">{{ name }}</div>
      <p class="text-gray-500">{{ category }}</p>
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
  },
  setup(props) {
    return {};
  },
});
</script>
<style lang=""></style>
