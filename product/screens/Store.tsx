import * as React from "react";
import { useState } from "react";
import { Product } from "../types";
import {
  Grid,
  Stack,
  Text,
  Flex,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  List,
  ListItem,
  Button,
  Link,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import ProductCard from "product/components/ProductCard";
import { parseCurrency } from "utils/currency";

interface Props {
  products: Product[];
}

interface CartItem extends Product {
  quantity: number;
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isCartOpen, toggleCart] = useState<any>(false);

  const total = React.useMemo(
    () =>
      parseCurrency(cart.reduce((total, product) => total + product.price * product.quantity, 0)),
    [cart],
  );

  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.quantity} ${product.title} - ${parseCurrency(
                product.price * product.quantity,
              )}\n`,
            ),
          ``,
        )
        .concat(`\nTotal: ${total}`),
    [cart, total],
  );

  const handleEditCartQuantity = (product: Product["id"], action: "increment" | "decrement") => {
    setCart((cart) => {
      return cart.reduce((acc, _product) => {
        if (product !== _product.id) {
          return acc.concat(_product);
        }

        if (action === "decrement") {
          if (_product.quantity === 1) {
            return acc;
          }

          return acc.concat({ ..._product, quantity: _product.quantity - 1 });
        } else if (action === "increment") {
          return acc.concat({ ..._product, quantity: _product.quantity + 1 });
        }

        return acc;
      }, []);
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart((cart) => {
      const isInCart = cart.some((item) => item.id === product.id);

      if (isInCart) {
        return cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return cart.concat({ ...product, quantity: 1 });
    });
  };

  return (
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>
        {Boolean(products.length) ? (
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                onSelectedImage={(image) => setSelectedImage(image)}
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
              colorScheme="whatsapp"
              size="lg"
              width="fit-content"
              onClick={() => toggleCart(true)}
            >
              Ver pedido ({cart.length} products)
            </Button>
          </Flex>
        )}
      </Stack>

      <Drawer isOpen={isCartOpen} placement="right" size="md" onClose={() => toggleCart(false)}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex justifyContent="center">
                <Image
                  mr={3}
                  src={"https://icongr.am/material/cart-outline.svg?size=32&color=000000"}
                />
                <Text>Tu pedido</Text>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <List spacing={4}>
                {cart.map((product, index) => (
                  <ListItem key={product.id}>
                    <Stack>
                      <HStack justifyContent="space-between">
                        <Text fontWeight="500">
                          {product.title} {product.quantity > 1 ? ` (X${product.quantity})` : ""}
                        </Text>
                        <Text color="green.400">
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                      </HStack>
                      <HStack>
                        <Button
                          size="xs"
                          onClick={() => handleEditCartQuantity(product.id, "decrement")}
                        >
                          -
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button
                          size="xs"
                          onClick={() => handleEditCartQuantity(product.id, "increment")}
                        >
                          +
                        </Button>
                      </HStack>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>

            <DrawerFooter>
              <AnimatePresence>
                <Button
                  isExternal
                  as={Link}
                  colorScheme="whatsapp"
                  href={`https://wa.me/5492945419603?text=${encodeURIComponent(text)}`}
                  leftIcon={
                    <Image
                      src={"https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"}
                    />
                  }
                  padding={4}
                  size="lg"
                  width="100%"
                >
                  Completar pedido ({total})
                </Button>
              </AnimatePresence>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

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
