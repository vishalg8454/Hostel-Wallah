import { Button, Center, Divider, Flex, Hide } from "@chakra-ui/react";
import { useContext } from "react";
// import { HouseContext } from "../../context/HouseContext";

import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";

const FilterList = ({ state, setState }) => {
  //   const { searchHandler } = useContext(HouseContext);

  return (
    <Flex
      my={{ base: "6", lg: "4", sm: "2" }}
      bg="white"
      p="6"
      gap={{ base: "5", lg: "4", sm: "2" }}
      shadow="md"
      direction={{ base: "column", md: "row", sm: "column" }}
    >
      <LocationFilter state={state} setState={setState} />

      <Hide below="md">
        <Center height="40px">
          <Divider orientation="vertical" />
        </Center>
      </Hide>

      <PriceFilter state={state} setState={setState} />

      <Hide below="md">
        <Center height="40px">
          <Divider orientation="vertical" />
        </Center>
      </Hide>

      <PropertyTypeFilter state={state} setState={setState} />

      <Hide below="md">
        <Center height="40px">
          <Divider orientation="vertical" />
        </Center>
      </Hide>

      <Button
        bg="purple.600"
        color="white"
        size={{ base: "lg", md: "lg" }}
        my={2}
        px={10}
        _hover={{ background: "#9F7AEA" }}
        // onClick={searchHandler}
      >
        Search
      </Button>
    </Flex>
  );
};

export { FilterList };
