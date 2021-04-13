import * as React from "react";
import { Stack, Image, Text, Button } from "@chakra-ui/react";
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
      data-testid="product"
      direction="row"
      justifyContent="space-between"
      padding={4}
      spacing={3}
    >
      <Stack direction="row" padding={4} width="100%">
        <Stack justifyContent="space-between" spacing={1} width="100%">
          <Stack spacing={1}>
            <Text>{product.title}</Text>
            <Text color="gray.500" fontSize="sm">
              {product.description}
            </Text>
          </Stack>
          <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
            <Text color="green.500" fontSize="md" fontWeight="500">
              {parseCurrency(product.price)}
            </Text>
            <Button
              colorScheme="primary"
              size="sm"
              variant="outline"
              onClick={() => onAdd(product)}
            >
              Agregar
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Image
        alt={product.title}
        backgroundColor="white"
        borderTopRadius="md"
        height={36}
        loading="lazy"
        objectFit="contain"
        src={product.image}
        width={36}
      />
    </Stack>
  );
};

export default ProductCard;
