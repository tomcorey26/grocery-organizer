<template>
  <div
    class="
      p-6
      max-w-md
      mx-auto
      bg-white
      rounded-xl
      shadow-lg
      flex
      justify-between
      space-x-4
      w-full
    "
  >
    <div>
      <div class="text-xl font-medium text-black">{{ name }}</div>
      <p class="text-gray-500">{{ category }}</p>
    </div>
    <div>
      <p class="text-gray-500">{{ count }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { GroceryItem } from '@/types/groceries';
export default defineComponent({
  props: {
    name: String as PropType<GroceryItem['name']>,
    count: Number as PropType<GroceryItem['count']>,
    category: String as PropType<GroceryItem['category']>,
  },
  setup(props) {
    return {
      ...props,
    };
  },
});
</script>
<style lang=""></style>
