import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { Product } from 'product/types';
import api from 'product/api';
import { Grid, Stack, Text, Button } from '@chakra-ui/react';

interface Props {
  products: Product[],
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setcart] = useState<Product[]>([]);

  return (
    <Stack>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack key={product.id} backgroundColor="gray.100">
            <Text>{product.title}</Text>
            <Text>{product.price}</Text>
            <Button onClick={() => setcart((cart) => cart.concat(product))} colorScheme="blue">Agregar</Button>
          </Stack>
        ))}
      </Grid>
      {cart.length && <Button>Ver carrito ({cart.length}) productos</Button>}
    </Stack>
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