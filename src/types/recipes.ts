import { FoodItem } from './food';

export interface Recipe {
  name: string;
  link: string;
  description: string;
  ingredients: FoodItem[];
}
