import { CartItem, Product } from "../types";
import * as React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
import { parseCurrency } from "utils/currency";

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
            <Stack divider={<Divider />} spacing={4}>
              {items.map((product) => (
                <Stack key={product.id} direction="row">
                  <Stack width="100%">
                    <Stack direction="row" justifyContent="space-between">
                      <Text fontWeight="500">{product.title}</Text>
                      <Text color="green.400">
                        {parseCurrency(product.price * product.quantity)}
                      </Text>
                    </Stack>
                    <Stack direction="row">
                      <Button size="xs" onClick={() => onDecrement(product)}>
                        -
                      </Button>
                      <Text>{product.quantity}</Text>
                      <Button size="xs" onClick={() => onIncrement(product)}>
                        +
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            {Boolean(items.length) && (
              <Button
                isExternal
                as={Link}
                colorScheme="whatsapp"
                href={`https://wa.me/5492945419603?text=${encodeURIComponent(text)}`}
                leftIcon={
                  <Image src={"https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"} />
                }
                padding={4}
                size="lg"
                width="100%"
              >
                Completar pedido ({total})
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartDrawer;
