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
        as={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        bottom={4}
        position="sticky"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          colorScheme="teal"
          onClick={onOpen}
          leftIcon={
            <Image
              src={"https://icongr.am/material/cart.svg?size=32&color=ffffff"}
            />
          }
        >
          Completar pedido ({cart.length}) productos
        </Button>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex justifyContent="center">
                <Image
                  src={
                    "https://icongr.am/material/cart-outline.svg?size=32&color=000000"
                  }
                  mr={3}
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
                  as={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  bottom={4}
                  position="sticky"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Button
                    isExternal
                    padding={4}
                    width="fit-content"
                    size="sm"
                    as={Link}
                    // href={`https://wa.me/5492945419603?text=${encodeURIComponent(text)}`}
                    colorScheme="whatsapp"
                    leftIcon={
                      <Image
                        src={
                          "https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                        }
                      />
                    }
                  >
                    Completar pedido ({cart.length}) productos
                  </Button>

                  <Button
                    size="sm"
                    width="100%"
                    variant="outline"
                    mt={3}
                    onClick={onClose}
                  >
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
