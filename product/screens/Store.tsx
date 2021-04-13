import * as React from "react";
import { useState } from "react";
import { CartItem, Product } from "../types";
import { Grid, Stack, Text, Flex, Button } from "@chakra-ui/react";
import ProductCard from "product/components/ProductCard";
import CartDrawer from "product/components/CartDrawer";
import { editCart } from "product/selectors";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, toggleCart] = useState<any>(false);

  const handleEditCart = (product: Product, action: "increment" | "decrement") => {
    setCart(editCart(product, action));
  };

  return (
    <Stack>
      <Stack spacing={6}>
        {Boolean(products.length) ? (
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(product) => handleEditCart(product, "increment")}
              />
            ))}
          </Grid>
        ) : (
          <Grid>
            <Text color="gray.500" fontSize="lg" margin="auto">
              No hay Productos
            </Text>
          </Grid>
        )}

        {Boolean(cart.length) && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{ base: "100%", sm: "fit-content" }}
              onClick={() => toggleCart(true)}
            >
              Ver pedido ({cart.reduce((acc, product) => acc + product.quantity, 0)} products)
            </Button>
          </Flex>
        )}
        <CartDrawer
          isOpen={isCartOpen}
          items={cart}
          onClose={() => toggleCart(false)}
          onDecrement={(product) => handleEditCart(product, "decrement")}
          onIncrement={(product) => handleEditCart(product, "increment")}
        />
      </Stack>
    </Stack>
  );
};

export default StoreScreen;
