import { CartItem, Product } from "../types";
import * as React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  CloseButton,
  DrawerHeader,
  Flex,
  DrawerBody,
  Stack,
  Divider,
  Button,
  DrawerFooter,
  Link,
  Text,
  Image,
  DrawerProps,
} from "@chakra-ui/react";
import { parseCurrency } from "../../utils/currency";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({ items, onClose, onIncrement, onDecrement, ...props }) => {
  const total = React.useMemo(
    () =>
      parseCurrency(items.reduce((total, product) => total + product.price * product.quantity, 0)),
    [items],
  );

  const quantity = React.useMemo(() => items.reduce((acc, product) => acc + product.quantity, 0), [
    items,
  ]);

  const text = React.useMemo(
    () =>
      items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title}${
                product.quantity > 1 ? ` (X${product.quantity})` : ""
              } - ${parseCurrency(product.price * product.quantity)}\n`,
            ),
          ``,
        )
        .concat(`\nTotal: ${total}`),
    [items, total],
  );

  React.useEffect(() => {
    if (!items.length) {
      onClose();
    }
  }, [items.length, onClose]);

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4}>
          <DrawerHeader>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Flex>
                <Image
                  mr={3}
                  src={"https://icongr.am/material/cart-outline.svg?size=32&color=000000"}
                />
                <Stack direction="row" fontSize={{ base: "2xl", sm: "3xl" }} fontWeight="500">
                  <Text>Tu pedido</Text> <Text textColor="gray.400">({quantity})</Text>
                </Stack>
              </Flex>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody data-testid="cart">
            {Boolean(items.length) ? (
              <Stack divider={<Divider />} spacing={4}>
                {items.map((product) => (
                  <Stack key={product.id} data-testid="cart-item" direction="row">
                    <Stack width="100%">
                      <Stack
                        alignItems="center"
                        direction="row"
                        fontWeight="500"
                        justifyContent="space-between"
                      >
                        <Text>{product.title}</Text>
                        <Text>{parseCurrency(product.price * product.quantity)}</Text>
                      </Stack>
                      <Stack direction="row">
                        <Button
                          borderRadius={9999}
                          colorScheme="primary"
                          data-testid="decrement"
                          size="xs"
                          onClick={() => onDecrement(product)}
                        >
                          -
                        </Button>
                        <Text fontWeight="500">{product.quantity}</Text>
                        <Button
                          borderRadius={9999}
                          colorScheme="primary"
                          data-testid="increment"
                          size="xs"
                          onClick={() => onIncrement(product)}
                        >
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Text align="center" color="gray.400">
                No hay items en tu carrito
              </Text>
            )}
          </DrawerBody>

          {Boolean(items.length) && (
            <DrawerFooter>
              <Stack spacing={4} width="100%">
                <Divider></Divider>
                <Stack
                  alignItems="center"
                  direction="row"
                  fontSize="lg"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Text>Total:</Text>
                  <Text>{total}</Text>
                </Stack>
                <Button
                  isExternal
                  as={Link}
                  colorScheme="whatsapp"
                  data-testid="complete-order"
                  href={`https://wa.me/5492945419603?text=${encodeURIComponent(text)}`}
                  leftIcon={
                    <Image
                      src={"https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff"}
                    />
                  }
                  padding={4}
                  size="lg"
                  width="100%"
                >
                  Completar pedido
                </Button>
              </Stack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartDrawer;
