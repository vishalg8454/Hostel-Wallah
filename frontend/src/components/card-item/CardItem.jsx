import {
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { BiChat, BiBed, BiBath, BiArea, BiTime } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CardItem = ({ house }) => {
  const navigate = useNavigate();
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
            {house.category === "Flat" && (
              <span
                style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}
              >
                /month
              </span>
            )}
          </Text>
          <Heading fontSize="26px" letterSpacing="tight">
            {house.name}
          </Heading>
          <Text fontSize="13px" color="grey">
            {house.description}
          </Text>
          <Divider my="2.5" />
          {house.category === "Flat" && (
            <HStack spacing="5">
              <HStack>
                <BiBed style={{ color: "purple" }} />
                <Text fontSize="12px">
                  {(Math.floor(Math.random() * 10) % 3) + 1} Beds
                </Text>
              </HStack>
              <HStack>
                <BiBath style={{ color: "purple" }} />
                <Text fontSize="12px">{1} Bathrooms</Text>
              </HStack>
              <Button onClick={() => navigate("/chat")}>
                <BiChat />
              </Button>
            </HStack>
          )}
          {house.category === "Items" && (
            <HStack spacing="5">
              <HStack>
                <BiTime style={{ color: "purple" }} />
                <Text fontSize="12px">
                  {Math.floor(Math.random() * 10)} months old
                </Text>
              </HStack>
              <Button onClick={() => navigate("/chat")}>
                <BiChat />
              </Button>
            </HStack>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export { CardItem };
