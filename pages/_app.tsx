import * as React from "react";
import {
  ChakraProvider,
  Box,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
  Container,
  Flex,
  Link,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "theme";
import { INFORMATION } from "../app/constants";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Container backgroundColor="white" marginY={4} maxWidth="container.xl" padding={4}>
          <Stack spacing={8}>
            <Stack marginBottom={4} spacing={0}>
              <Image borderRadius="lg" height="100%" maxHeight={64} src={INFORMATION.banner} />
              <Stack
                alignItems="center"
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: 3, sm: 6 }}
              >
                <Box
                  backgroundColor="white"
                  borderRadius={9999}
                  marginTop={-8}
                  maxWidth={{ base: 24, sm: 32 }}
                  minWidth={{ base: 24, sm: 32 }}
                  padding={1}
                >
                  <Image borderRadius={9999} height="100%" src={INFORMATION.avatar} width="100%" />
                </Box>
                <Stack
                  alignItems={{ base: "center", sm: "flex-start" }}
                  spacing={3}
                  textAlign={{ base: "center", sm: "left" }}
                >
                  <Heading>{INFORMATION.title}</Heading>
                  <Text color="gray.500" fontWeight="500">
                    {INFORMATION.description}
                  </Text>
                  <Stack direction="row">
                    {INFORMATION.social.map((social) => (
                      <Link key={social.name} isExternal href={social.url}>
                        <Flex
                          alignItems="center"
                          backgroundColor="primary.500"
                          borderRadius={9999}
                          color="white"
                          height={10}
                          justifyContent="center"
                          width={10}
                        >
                          <Image
                            src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                          />
                        </Flex>
                      </Link>
                    ))}
                  </Stack>
                </Stack>
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
