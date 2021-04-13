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
      borderColor="gray.100"
      borderRadius="md"
      borderWidth={1}
      boxShadow="md"
      data-testid="product"
      padding={4}
      spacing={3}
    >
      <Stack direction="row">
        <Image
          alt={product.title}
          backgroundColor="white"
          borderTopRadius="md"
          height={16}
          loading="lazy"
          objectFit="contain"
          src={product.image}
          width={16}
        />
        <Stack spacing={1}>
          <Text>{product.title}</Text>
          <Text color="green.500" fontSize="md" fontWeight="500">
            {parseCurrency(product.price)}
          </Text>
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
