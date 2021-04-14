import * as React from "react";
import { useState } from "react";
import { CartItem, Product } from "../types";
import { Grid, Stack, Text, Flex, Button } from "@chakra-ui/react";
import ProductCard from "product/components/ProductCard";
import CartDrawer from "product/components/CartDrawer";
import { editCart } from "product/selectors";
import { parseCurrency } from "../../utils/currency";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, toggleCart] = useState<any>(false);

  const handleEditCart = (product: Product, action: "increment" | "decrement") => {
    setCart(editCart(product, action));
  };

  const total = React.useMemo(
    () =>
      parseCurrency(cart.reduce((total, product) => total + product.price * product.quantity, 0)),
    [cart],
  );

  const quantity = React.useMemo(() => cart.reduce((acc, product) => acc + product.quantity, 0), [
    cart,
  ]);

  return (
    <Stack>
      <Stack spacing={6}>
        {Boolean(products.length) ? (
          <Grid
            gridGap={8}
            templateColumns={{
              base: "repeat(auto-fill, minmax(240px, 1fr))",
              sm: "repeat(auto-fill, minmax(360px, 1fr))",
            }}
          >
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
              boxShadow="xl"
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{ base: "100%", sm: "fit-content" }}
              onClick={() => toggleCart(true)}
            >
              <Stack alignItems="center" direction="row" spacing={6}>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Text fontSize="md">Ver pedido</Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    borderRadius="sm"
                    color="gray.100"
                    fontSize="xs"
                    fontWeight="500"
                    paddingX={2}
                    paddingY={1}
                  >
                    {quantity} items
                  </Text>
                </Stack>
                <Text fontSize="md">{total}</Text>
              </Stack>
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
