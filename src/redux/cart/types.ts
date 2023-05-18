export type CartItem={
    id: string;
    title: string;
    type: string;
    size: number;
    price: number;
    imageUrl: string;
    count: number;
    totalPrice: number | number[];
  }
  
 export interface CartSliceState {
    totalPrice: number;
    items: CartItem[]
  }

 export interface ItemIdentifier {
    id: string;
    type: string;
    size: number;
  }