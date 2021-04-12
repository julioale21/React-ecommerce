import { Product } from "product/types";
import * as React from "React";
import CartItem from "./CartItem";

type CartListProps = {
  cart: Product[];
};

export default function CartList({ cart }: CartListProps) {
  return (
    <>
      {cart.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </>
  );
}
