<template>
  <section class="p-4">
    <input
      v-model="name"
      name="title"
      class="pt-4 pb-2 focus:border-b-primary focus:border-b-2 w-full bg-transparent text-3xl"
      type="text"
      placeholder="Title"
    />

    <input
      v-model="link"
      name="link"
      class="pt-4 pb-2 focus:border-b-primary focus:border-b-2 w-full bg-transparent text-3xl"
      type="text"
      placeholder="Link"
    />

    <textarea
      v-model="description"
      class="pt-4 pb-2 focus:border-b-primary focus:border-b-2 w-full bg-transparent text-xl text-gray-400"
      name="description"
      placeholder="Description"
      rows="4"
    ></textarea>

    <form @submit.prevent="add()" class="my-5 flex justify-center gap-3 t-card">
      <TextField label="Item" v-model="ingredient.name" />
      <TextField
        type="number"
        label="Count"
        v-model.number="ingredient.count"
      />
      <TextField label="Category" v-model="ingredient.category" />
      <div>
        <button class="t-btn bg-primary">Add</button>
        <button
          @click="addRecipe()"
          type="button"
          class="t-btn bg-secondary mt-2"
        >
          Create Recipe
        </button>
      </div>
    </form>
    <div class="flex flex-col gap-2 w-full">
      <GroceryItem
        v-for="item in list"
        v-bind="item"
        @increment="incrementCount(item)"
        @decrement="decrementCount(item)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import GroceryItem from '@/components/GroceryItem.vue';
import TextField from '@/components/Form/TextField.vue';
import DefaultButton from '@/components/Button/DefaultButton.vue';

import { FoodItem } from '@/types/food';
import { Recipe } from '@/types/recipes';
import { createRecipe } from '@/services/recipes';

export default defineComponent({
  components: {
    GroceryItem,
    TextField,
    DefaultButton,
  },
  setup(props) {
    const name = ref('');
    const description = ref('');
    const link = ref('');
    const ingredients = useIngredientsList([]);

    function addRecipe() {
      const recipe: Recipe = {
        name: name.value,
        link: link.value,
        description: description.value,
        ingredients: ingredients.list,
      };

      createRecipe(recipe);
    }

    return {
      name,
      description,
      addRecipe,
      link,
      ...ingredients,
    };
  },
});

function useIngredientsList(initialList: FoodItem[] = []) {
  const list = reactive<FoodItem[]>(initialList);

  const ingredient = reactive<FoodItem>({
    category: 'Vegetable',
    count: 0,
    name: '',
  });

  const add = () => {
    list.push({ ...ingredient });
    ingredient.name = '';
    ingredient.count = 0;
  };

  const remove = (item: FoodItem) => {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
  };

  const decrementCount = (item: FoodItem) => {
    item.count -= 1;
    if (!item.count) remove(item);
  };

  const incrementCount = (item: FoodItem) => {
    item.count++;
  };

  return {
    list,
    ingredient,
    add,
    remove,
    incrementCount,
    decrementCount,
  };
}
</script>

<style lang=""></style>
