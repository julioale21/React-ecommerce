import React, { useState } from "react";
import { GetStaticProps } from "next";
import { Product } from "product/types";
import api from "product/api";
import { Grid, Stack, Text, Button, Image, Flex, Center } from "@chakra-ui/react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import CartDrawer from "product/components/cart/CartDrawer";

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

const IndexRoute: React.FC<Props> = ({ products }: Props) => {
  const [cart, setcart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map((product) => (
            <Stack
              key={product.id}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              color="green.500"
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
                onClick={() => setSelectedImage(product.image)}
              />
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text>{parseCurrency(product.price)}</Text>
              </Stack>
              <Center>
                <Button
                  colorScheme="primary"
                  size="sm"
                  variant="outline"
                  onClick={() => setcart((cart) => cart.concat(product))}
                >
                  Agregar
                </Button>
              </Center>
            </Stack>
          ))}
        </Grid>
        {Boolean(cart.length) && <CartDrawer cart={cart} />}
      </Stack>

      <AnimatePresence>
        {selectedImage && (
          <Flex
            key="backdrop"
            alignItems="center"
            as={motion.div}
            backgroundColor="rgba(0,0,0,0.5)"
            height="100%"
            justifyContent="center"
            layoutId={selectedImage}
            left={0}
            position="fixed"
            top={0}
            width="100%"
            onClick={() => setSelectedImage(null)}
          >
            <Image key="image" src={selectedImage} />
          </Flex>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

export default IndexRoute;
