import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { Product } from "product/types";
import { motion, AnimatePresence } from "framer-motion";
import CartList from "./CartList";

type DrawerProps = {
  cart: Product[];
};

export default function CartDrawer({ cart }: DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignItems="center"
        animate={{ scale: 1 }}
        as={motion.div}
        bottom={4}
        exit={{ scale: 0 }}
        initial={{ scale: 0 }}
        justifyContent="center"
        position="sticky"
      >
        <Button
          colorScheme="teal"
          leftIcon={<Image src={"https://icongr.am/material/cart.svg?size=32&color=ffffff"} />}
          onClick={onOpen}
        >
          Completar pedido ({cart.length}) productos
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex justifyContent="center">
                <Image
                  mr={3}
                  src={"https://icongr.am/material/cart-outline.svg?size=32&color=000000"}
                />
                <Text>Mi Carrito</Text>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <CartList cart={cart} />
            </DrawerBody>

            <DrawerFooter>
              <AnimatePresence>
                <Flex
                  alignItems="center"
                  animate={{ scale: 1 }}
                  as={motion.div}
                  bottom={4}
                  exit={{ scale: 0 }}
                  flexDirection="column"
                  initial={{ scale: 0 }}
                  justifyContent="center"
                  position="sticky"
                >
                  <Button
                    isExternal
                    as={Link}
                    colorScheme="whatsapp"
                    leftIcon={
                      <Image
                        src={"https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"}
                      />
                    }
                    padding={4}
                    // href={`https://wa.me/5492945419603?text=${encodeURIComponent(text)}`}
                    size="sm"
                    width="fit-content"
                  >
                    Completar pedido ({cart.length}) productos
                  </Button>

                  <Button mt={3} size="sm" variant="outline" width="100%" onClick={onClose}>
                    Cancel
                  </Button>
                </Flex>
              </AnimatePresence>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
