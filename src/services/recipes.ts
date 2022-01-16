import { db } from '@/firebase';
import { Recipe } from '@/types/recipes';
import { addDoc, collection } from 'firebase/firestore';

const ref = collection(db, 'recipes');

export async function createRecipe(recipe: Recipe) {
  try {
    return await addDoc(ref, recipe);
  } catch (e) {
    alert('Error!');
  }
}
