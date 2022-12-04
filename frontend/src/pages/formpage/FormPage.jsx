import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "./form-page.css";
import {
  Hide,
  Container,
  Heading,
  HStack,
  Show,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Select,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
} from "@chakra-ui/react";
import { HouseList } from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormPage = ({ items, setItems, setLoggedIn,URL }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("Flat");
  const [type, setType] = useState("1 bhk");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    price: 0,
    description: "",
    imageURL: "",
  });

  const additem = () => {
    (async () => {
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };
        const res = await axios.post(
          `${URL}api/product`,
          {
            name: state.name,
            price: state.price,
            description: state.description,
            imageURL: state.imageURL,
            category: category,
            type: type,
          },
          config
        );
        const ress = await axios.get(`${URL}products`);
        setItems(ress.data.data);
        console.log(res);
        toast.success("Item added successfully");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setModalOpen(false);
      }
    })();
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        blockScrollOnMount={false}
        isCentered
        size={"md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center bg-text font-tele">
            Add New Item
          </ModalHeader>
          <ModalCloseButton onClick={() => setModalOpen(false)} />
          <ModalBody className="py-4 gradient-blue">
            <VStack>
              <HStack>
                <Input
                  placeholder="Enter Name"
                  size="md"
                  onChange={(e) =>
                    setState((p) => ({ ...p, name: e.target.value }))
                  }
                />
                <Input
                  placeholder="Enter Price"
                  size="md"
                  onChange={(e) =>
                    setState((p) => ({ ...p, price: Number(e.target.value) }))
                  }
                />
              </HStack>
              <Input
                placeholder="Enter Description"
                size="md"
                onChange={(e) =>
                  setState((p) => ({ ...p, description: e.target.value }))
                }
              />
              <Input
                placeholder="Enter ImageURL"
                size="md"
                onChange={(e) =>
                  setState((p) => ({ ...p, imageURL: e.target.value }))
                }
              />
              <Select
                variant="filled"
                onChange={(e) => setCategory(() => e.target.value)}
              >
                {["Flat", "Items"].map((country, index) => {
                  return <option key={index}>{country}</option>;
                })}
              </Select>
              <Select
                variant="filled"
                onChange={(e) => setType((p) => e.target.value)}
              >
                {category === "Flat" &&
                  ["1 bhk", "2 bhk", "3 bhk"].map((country, index) => {
                    return <option key={index}>{country}</option>;
                  })}
                {category === "Items" &&
                  ["books", "stationary", "utensils", "home"].map(
                    (country, index) => {
                      return <option key={index}>{country}</option>;
                    }
                  )}
              </Select>
              <Button
                _hover={{ background: "#9F7AEA" }}
                bg="purple.600"
                mx={5}
                my={5}
                colorScheme="teal"
                variant="solid"
                isLoading={loading}
                onClick={() => additem()}
              >
                Add Item
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Container maxW="container.lg" my="8">
        <Heading
          fontSize={{ base: "5xl", sm: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
          align="center"
          fontWeight="extrabold"
        >
          Your Items
          <Button
            _hover={{ background: "#9F7AEA" }}
            bg="purple.600"
            mx={5}
            colorScheme="teal"
            variant="solid"
            onClick={() => setModalOpen(true)}
          >
            +
          </Button>
        </Heading>
        <HouseList houses={items.filter((it) => it.belongsToId === id)} />
      </Container>
      <div className="center-div">
        <Button
          colorScheme="red"
          variant="solid"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            setLoggedIn(false);
            toast.success("Logged out Successfully");
            navigate("/");
          }}
        >
          Log Out
        </Button>
      </div>
    </>
  );
};

export { FormPage };
