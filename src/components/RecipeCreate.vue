<template>
  <button @click="createRecipe()" type="button" class="t-btn bg-green-400 mt-2">
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
    <TextField type="number" label="Count" v-model.number="ingredient.count" />
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
</template>

<script setup lang="ts">
import GroceryItem from '@/components/GroceryItem.vue';
import TextField from '@/components/Form/TextField.vue';

import { onMounted, reactive, ref } from 'vue';

import { FoodItem } from '@/types/food';
import { Recipe } from '@/types/recipes';
import recipeService from '@/services/recipes';
import { TailwindColor } from '@/utils/generateTailwindColor';
import { useToast } from 'vue-toastification';
import { useGlobalState } from '@/store';

const store = useGlobalState();
const name = ref('');
const description = ref('');
const link = ref('');
const {
  add,
  decrementCount,
  incrementCount,
  ingredient,
  list,
  remove,
  tailwindColor,
} = useIngredientsList([]);
const nameInput = ref(null);

const toast = useToast();

onMounted(() => {
  nameInput.value.focus();
});

async function createRecipe() {
  const recipe: Recipe = {
    name: name.value,
    link: link.value,
    description: description.value,
    ingredients: list,
  };

  try {
    store.isLoading = true;
    await recipeService.createRecipe(recipe);
    store.isLoading = false;
    toast.success(recipe.name + 'Sucessfully Created!');
  } catch (err) {
    toast.error(err);
  }
}

function useIngredientsList(initialList: FoodItem[] = []) {
  const list = reactive<FoodItem[]>(initialList);
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
    tailwindColor,
  };
}
</script>

<style lang=""></style>
