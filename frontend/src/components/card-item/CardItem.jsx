import {
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

const CardItem = ({ house }) => {
  return (
    <Flex justify="center" align="center">
      <Stack width="300px" bg="white" boxShadow="xl" borderRadius="xl">
        <Image src={house.imageURL} h="170" alt="" />
        <Flex p="4" direction="column">
          <Text
            mt="-1"
            fontWeight="extrabold"
            fontSize="19px"
            color="purple.500"
          >
            Rs.{house.price}
            {house.category === "Flat" &&
            <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
              /month
            </span>
}
          </Text>
          <Heading fontSize="26px" letterSpacing="tight">
            {house.name}
          </Heading>
          <Text fontSize="13px" color="grey">
            {house.description}
          </Text>
          <Divider my="2.5" />
          <HStack spacing="5">
            <HStack>
              <BiBed style={{ color: "purple" }} />
              <Text fontSize="12px">{2} Beds</Text>
            </HStack>
            <HStack>
              <BiBath style={{ color: "purple" }} />
              <Text fontSize="12px">{1} Bathrooms</Text>
            </HStack>
            <HStack>
              <BiArea style={{ color: "purple" }} />
              <Text fontSize="12px">{1}</Text>
            </HStack>
          </HStack>
        </Flex>
      </Stack>
    </Flex>
  );
};

export { CardItem };
