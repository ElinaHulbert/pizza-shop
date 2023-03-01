export type PizzaItem = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
  rating: number;
};

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  currentPage: string;
  order: string;
  search: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
