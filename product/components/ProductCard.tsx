import * as React from "react";
import { Stack, Image, Text, Button, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Product } from "product/types";
import { parseCurrency } from "../../utils/currency";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  onSelectedImage: (image: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd, onSelectedImage }) => {
  return (
    <Stack
      key={product.id}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      color="green.500"
      data-test-id="product"
      fontSize="sm"
      fontWeight="500"
      padding={4}
      spacing={6}
    >
      <Image
        alt={product.title}
        as={motion.img}
        borderTopRadius="md"
        cursor="pointer"
        layoutId={product.image}
        maxHeight={128}
        objectFit="cover"
        src={product.image}
        onClick={() => onSelectedImage(product.image)}
      />
      <Stack spacing={1}>
        <Text>{product.title}</Text>
        <Text>{parseCurrency(product.price)}</Text>
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
