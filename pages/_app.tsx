import * as React from "react";
import {
  ChakraProvider,
  VStack,
  Image,
  Heading,
  Text,
  Box,
  Divider,
  Container,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "theme";
import { INFORMATION } from "../app/constants";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Box padding={4}>
          <Container
            backgroundColor="white"
            boxShadow="md"
            marginY={4}
            maxWidth="container.xl"
            padding={4}
          >
            <VStack marginBottom={4}>
              <Image borderRadius={9999} src={INFORMATION.avatar}></Image>
              <Heading>{INFORMATION.title}</Heading>
              <Text>{INFORMATION.description}</Text>
            </VStack>
            <Divider marginY={4} />
            <Component {...pageProps} />
            <Divider marginY={4} />
            <Text textAlign="center">© Copyright {new Date().getFullYear()}</Text>
          </Container>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
