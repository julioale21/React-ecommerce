import React from "react";
import { Text } from "@chakra-ui/react";
import { Product } from "product/types";

type ItemProps = {
  product: Product;
};
export default function CartItem({ product }: ItemProps) {
  console.log(product);
  return (
    <>
      <Text>{product.title}</Text>
    </>
  );
}