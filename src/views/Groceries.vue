<template>
  <div>
    {{ groceryItem.name }}
    {{ groceryItem.count }}
    {{ groceryItem.category }}
    <form
      @submit.prevent="add(groceryItem)"
      class="my-5 flex justify-center gap-3"
    >
      <TextField label="Item" v-model="groceryItem.name" />
      <TextField
        type="number"
        label="Count"
        v-model.number="groceryItem.count"
      />
      <TextField label="Category" v-model="groceryItem.category" />
      <button>add</button>
    </form>
    <div class="flex flex-col gap-2 w-full">
      <GroceryItem
        v-for="item in groceryList"
        v-bind="item"
        @click="remove(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import GroceryItem from '@/components/GroceryItem.vue';
import TextField from '@/components/Form/TextField.vue';
import { GroceryItem as GroceryItemType } from '@/types/groceries';

export default defineComponent({
  components: {
    GroceryItem,
    TextField,
  },
  setup(props) {
    const grocery = useGroceryList([
      { name: 'Rice', count: 2, category: 'Vegetable' },
    ]);

    const groceryItem = reactive<GroceryItemType>({
      category: 'Vegetable',
      count: 0,
      name: '',
    });

    return {
      ...grocery,
      groceryItem,
    };
  },
});

function useGroceryList(initialList: GroceryItemType[] = []) {
  const groceryList = reactive<GroceryItemType[]>(initialList);

  const add = (item: GroceryItemType) => {
    groceryList.push(item);
  };

  const remove = (item: GroceryItemType) => {
    const index = groceryList.indexOf(item);
    if (index > -1) {
      groceryList.splice(index, 1);
    }
  };

  return {
    groceryList,
    add,
    remove,
  };
}
</script>
<style lang=""></style>
