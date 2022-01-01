export type Category = 'Vegetable' | 'Wheat' | 'Spice' | 'Misc';

export interface GroceryItem {
  name: string;
  count: number;
  category: Category;
}
