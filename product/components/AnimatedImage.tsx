import { Flex, Image } from "@chakra-ui/react";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import React from "react";

interface Props {
  image: string;
  onSelected: VoidFunction;
}

const AnimatedImage: React.FC<Props> = ({ image, onSelected }) => {
  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence>
        <Flex
          key="backdrop"
          alignItems="center"
          as={motion.div}
          backgroundColor="rgba(0,0,0,0.5)"
          height="100%"
          justifyContent="center"
          layoutId={image}
          left={0}
          position="fixed"
          top={0}
          width="100%"
          onClick={onSelected}
        >
          <Image key="image" src={image} />
        </Flex>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default AnimatedImage;
