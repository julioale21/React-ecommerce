import * as React from "react";
import { Stack, Image, Text, Button, Center } from "@chakra-ui/react";
import { Product } from "product/types";
import { parseCurrency } from "../../utils/currency";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  return (
    <Stack
      key={product.id}
      backgroundColor="gray.100"
      borderRadius="md"
      data-test-id="product"
      padding={4}
      spacing={3}
    >
      <Stack direction="row">
        <Image
          alt={product.title}
          backgroundColor="white"
          borderTopRadius="md"
          height={16}
          objectFit="contain"
          src={product.image}
          width={16}
        />
        <Stack spacing={1}>
          <Text>{product.title}</Text>
          <Text>{parseCurrency(product.price)}</Text>
        </Stack>
      </Stack>
      <Center>
        <Button colorScheme="primary" size="sm" variant="outline" onClick={() => onAdd(product)}>
          Agregar
        </Button>
      </Center>
    </Stack>
  );
};

export default ProductCard;
