<template>
  <div>
    <form></form>
    <GroceryItem v-for="item in groceryList" v-bind="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import GroceryItem from '@/components/GroceryItem.vue';
import { GroceryItem as GroceryItemType } from '@/types/groceries';

export default defineComponent({
  components: {
    GroceryItem,
  },
  setup(props) {
    const groceryList = reactive<GroceryItemType[]>([
      { name: 'Rice', count: 2, category: 'Vegetable' },
    ]);

    return {
      groceryList,
    };
  },
});
</script>
<style lang=""></style>
