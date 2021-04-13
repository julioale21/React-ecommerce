import * as React from "react";
import { ChakraProvider, Stack, Image, Heading, Text, Divider, Container } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "theme";
import { INFORMATION } from "../app/constants";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Container backgroundColor="white" marginY={4} maxWidth="container.xl" padding={4}>
          <Stack marginBottom={4} spacing={8}>
            <Image borderRadius="lg" height="100%" maxHeight={64} src={INFORMATION.banner} />
            <Stack alignItems="center" direction="row" spacing={6}>
              <Image borderRadius={9999} height={32} src={INFORMATION.avatar} width={32} />
              <Stack spacing={1}>
                <Heading>{INFORMATION.title}</Heading>
                <Text color="gray.500" fontWeight="500">
                  {INFORMATION.description}
                </Text>
              </Stack>
            </Stack>
            <Component {...pageProps} />
          </Stack>
          <Divider marginY={4} />
          <Text textAlign="center">© Copyright {new Date().getFullYear()}</Text>
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
