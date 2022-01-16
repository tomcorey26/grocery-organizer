export type Category = 'Vegetable' | 'Wheat' | 'Spice' | 'Misc';

export interface FoodItem {
  name: string;
  count: number;
  category: Category;
}
