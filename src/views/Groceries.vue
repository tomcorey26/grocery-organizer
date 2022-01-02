<template>
  <div>
    {{ groceryItem.name }}
    <form>
      <TextField label="Item" v-model="groceryItem.name" />
    </form>
    <GroceryItem
      v-for="item in groceryList"
      v-bind="item"
      @click="remove(item)"
    />
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
