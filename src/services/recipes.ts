import { db } from '@/firebase';
import { Recipe } from '@/types/recipes';
import { addDoc, collection } from 'firebase/firestore';

const recipeCollection = collection(db, 'recipes');

// I want it so that I dont have to wrap every firebase query in a try catch function
async function createRecipe(recipe: Recipe) {
  return await addDoc(recipeCollection, recipe);
}

export default {
  createRecipe,
};
