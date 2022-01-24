<template>
  <section class="p-4">
    <button @click="addRecipe()" type="button" class="t-btn bg-green-400 mt-2">
      Create Recipe
    </button>

    <input
      ref="nameInput"
      v-model="name"
      name="title"
      class="pt-4 pb-2 focus:border-b-primary focus:border-b-2 w-full bg-transparent text-3xl focus:animate-pulse"
      type="text"
      placeholder="Title"
    />

    <input
      v-model="link"
      name="link"
      class="pt-4 pb-2 focus:border-b-primary focus:border-b-2 w-full bg-transparent text-3xl focus:animate-pulse"
      type="text"
      placeholder="Link"
    />

    <textarea
      v-model="description"
      class="pt-4 pb-2 focus:border-b-primary focus:border-b-2 w-full bg-transparent text-xl text-gray-400 focus:animate-pulse"
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
      </div>
    </form>
    <div class="grid grid-cols-3 gap-2 w-full">
      <GroceryItem
        v-for="item in list"
        v-bind="item"
        :color="tailwindColor.getColorOf(item.category)"
        @increment="incrementCount(item)"
        @decrement="decrementCount(item)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import GroceryItem from '@/components/GroceryItem.vue';
import TextField from '@/components/Form/TextField.vue';
import DefaultButton from '@/components/Button/DefaultButton.vue';

import { FoodItem } from '@/types/food';
import { Recipe } from '@/types/recipes';
import { createRecipe } from '@/services/recipes';
import { TailwindColor } from '@/utils/generateTailwindColor';

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
    const nameInput = ref(null);

    onMounted(() => {
      nameInput.value.focus();
    });

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
      nameInput,
      ...ingredients,
    };
  },
});

function useIngredientsList(initialList: FoodItem[] = []) {
  const list = reactive<FoodItem[]>(initialList);
  const colorMap = {};
  const tailwindColor = new TailwindColor();

  const ingredient = reactive<FoodItem>({
    category: 'Vegetable',
    count: 0,
    name: '',
  });

  const add = () => {
    list.push({ ...ingredient });
    ingredient.name = '';
    ingredient.count = 0;
    tailwindColor.mapToRandomColor(ingredient.category);
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
    colorMap,
    tailwindColor,
  };
}
</script>

<style lang=""></style>
