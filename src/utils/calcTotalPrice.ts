import { CartItem } from "../redux/cart/types";
export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum; //sum is the previous sum we had in cart
      }, 0);
}

export const minusTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
      return sum - (obj.price * obj.count) //sum is the previous sum we had in cart
    }, 0);
}