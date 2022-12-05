import "./landing-page.css";
import { FilterList, HouseList } from "../../components";
import { useState } from "react";
import { useEffect } from "react";
import {
  Hide,
  Container,
  Heading,
  HStack,
  Show,
  Text
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { Spinner, Flex, Center } from "@chakra-ui/react";

const LandingPage = ({ items, URL, loading }) => {
  const [state, setState] = useState({
    category: "Flat",
    price: "",
    type: "All",
  });

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // console.log(items);
    // console.log(state);
    setFilteredItems(() =>
      items.filter((it) => it.category === state.category)
    );
    if (state.type !== "All") {
      setFilteredItems((prev) => prev.filter((it) => it.type === state.type));
    }
  }, [state, items]);

  useEffect(() => {}, []);

  return (
    <Container maxW="container.lg" my="8">
      <Heading
        fontSize={{ base: "5xl", sm: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
        align="center"
        fontWeight="extrabold"
      >
        Search Item to rent/buy
      </Heading>
      <Show below="md">
        <HStack
          my="2"
          py="2"
          cursor="pointer"
          _hover={{ backgroundColor: "#CBD5E0" }}
          _active={{ transform: "translateY(2px)" }}
          bg="gray.200"
          justify="center"
          // onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter /> <Text>Filter</Text>
        </HStack>
      </Show>
      <Hide below="md">
        <FilterList state={state} setState={setState} />
      </Hide>
      {/* {<FilterList state={state} setState={setState}/>} */}
      {loading && (
        <div className="div-cen">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#9F7AEA"
            size="xl"
          />
        </div>
      )}
      <HouseList houses={filteredItems} />
    </Container>
  );

  return (
    <main className="landing-main">
      <div className="filter-container">
        <FilterList state={state} setState={setState} />
      </div>
      <HouseList houses={filteredItems} />
    </main>
  );
};
export { LandingPage };
