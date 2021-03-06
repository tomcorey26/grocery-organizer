<template>
  <div>
    <form @submit.prevent="add()" class="my-5 flex justify-center gap-3">
      <TextField label="Item" v-model="groceryItem.name" />
      <TextField
        type="number"
        label="Count"
        v-model.number="groceryItem.count"
      />
      <TextField label="Category" v-model="groceryItem.category" />
      <button class="t-btn bg-primary h-12">Add</button>
    </form>
    <div class="flex flex-col gap-2 w-full">
      <GroceryItem
        v-for="item in groceryList"
        v-bind="item"
        @increment="incrementCount(item)"
        @decrement="decrementCount(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import GroceryItem from '@/components/GroceryItem.vue';
import TextField from '@/components/Form/TextField.vue';
import DefaultButton from '@/components/Button/DefaultButton.vue';
import { GroceryItem as GroceryItemType } from '@/types/groceries';

export default defineComponent({
  components: {
    GroceryItem,
    TextField,
    DefaultButton,
  },
  setup(props) {
    const grocery = useGroceryList([
      { name: 'Rice', count: 2, category: 'Vegetable' },
    ]);

    return {
      ...grocery,
    };
  },
});

function useGroceryList(initialList: GroceryItemType[] = []) {
  const groceryList = reactive<GroceryItemType[]>(initialList);

  const groceryItem = reactive<GroceryItemType>({
    category: 'Vegetable',
    count: 0,
    name: '',
  });

  const add = () => {
    groceryList.push({ ...groceryItem });
    groceryItem.name = '';
    groceryItem.count = 0;
  };

  const remove = (item: GroceryItemType) => {
    const index = groceryList.indexOf(item);
    if (index > -1) {
      groceryList.splice(index, 1);
    }
  };

  const decrementCount = (item: GroceryItemType) => {
    item.count -= 1;
    if (!item.count) remove(item);
  };

  const incrementCount = (item: GroceryItemType) => {
    item.count++;
  };

  return {
    groceryList,
    groceryItem,
    add,
    remove,
    incrementCount,
    decrementCount,
  };
}
</script>
<style lang=""></style>
