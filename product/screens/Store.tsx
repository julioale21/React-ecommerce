import * as React from "react";
import { useState } from "react";
import { Product } from "../types";
import { Grid, Stack, Text, Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import CartDrawer from "product/components/cart/CartDrawer";
import ProductCard from "product/components/ProductCard";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setcart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>
        {Boolean(products.length) ? (
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(product) => setcart((cart) => cart.concat(product))}
                onSelectedImage={(image) => setSelectedImage(image)}
              />
            ))}
          </Grid>
        ) : (
          <Grid>
            <Text color="gray.500" fontSize="lg" margin="auto">
              There are no products
            </Text>
          </Grid>
        )}
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

export default StoreScreen;
