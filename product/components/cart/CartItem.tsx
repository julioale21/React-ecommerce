import * as React from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { Product } from "product/types";

type ItemProps = {
  product: Product;
};
export default function CartItem({ product }: ItemProps) {
  // eslint-disable-next-line no-console
  console.log(product);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text>{product.title}</Text>
        <Input defaultValue={1} type="number" width={14} />
      </Flex>
    </>
  );
}
