export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number | string;
  currentPage: number;
  sort: Sort;
}
