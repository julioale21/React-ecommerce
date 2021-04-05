import React, { useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { Product } from 'product/types';
import api from 'product/api';
import { Grid, Stack, Text, Button, Link, Image, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";


interface Props {
  products: Product[],
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setcart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);


  const text = useMemo(() => 
    cart
      .reduce(
        (message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
        "",
      )
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`), 
    [cart],
  );

  return (
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map((product) => (
            <Stack 
              padding={4}
              color="green.500"
              fontSize="sm"
              fontWeight="500"
              borderRadius="md" 
              key={product.id} 
              spacing={3}
              backgroundColor="gray.100"
            >
                <Image  
                  alt={product.title}
                  as={motion.img}
                  cursor="pointer"
                  layoutId={product.image}
                  objectFit="cover" 
                  maxHeight={128}
                  borderTopRadius="md" 
                  src={product.image}
                  onClick={() => setSelectedImage(product.image)}
                />
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text>{parseCurrency(product.price)}</Text>
              </Stack>
              <Button 
                onClick={() => setcart((cart) => cart.concat(product))} 
                colorScheme="primary"
                size="sm"
                variant="outline"
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Flex 
              as={motion.div}
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{scale: 0}}
              bottom={4}
              position="sticky"
              alignItems="center"
              justifyContent="center"
            >
              <Button 
                isExternal
                padding={4}
                width="fit-content"
                as={Link}
                href={`https://wa.me/5492945419603?text=${encodeURIComponent(text)}`} 
                colorScheme="whatsapp"
              >
                Completar pedido ({cart.length}) productos
              </Button>
            </Flex>
          )}
        </AnimatePresence>
      </Stack>

      <AnimatePresence>
          {selectedImage && (
            <Flex 
              key="backdrop"
              alignItems="center"
              justifyContent="center"
              as={motion.div}
              backgroundColor="rgba(0,0,0,0.5)"
              position="fixed"
              top={0}
              left={0}
              height="100%"
              width="100%"
              layoutId={selectedImage}
              onClick={() => setSelectedImage(null)}
            >
              <Image key="image" src={selectedImage} />
            </Flex>
          )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    props: {
      products
    },
    revalidate: 10
  }
}

export default IndexRoute;