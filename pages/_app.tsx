import React from "React";
import { ChakraProvider, VStack, Image, Heading, Text, Box, Divider } from "@chakra-ui/react";
import { AppProps, Container } from "next/app";
import theme from "theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginY={6}>
            <Image borderRadius={9999} src="//placehold.it/128x128"></Image>
            <Heading>Ecommerce</Heading>
            <Text>Mi Almacen</Text>
          </VStack>
          <Divider marginY={2} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
