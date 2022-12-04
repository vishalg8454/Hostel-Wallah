import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useContext } from "react";
// import { HouseContext } from "../../context/HouseContext";

const PriceFilter = ({ state, setState }) => {
  //   const { price, setPrice } = useContext(HouseContext);

  const prices = [
    { value: "2000 - 3000" },
    { value: "3000 - 11000" },
    { value: "11000 - 14000" },
    { value: "14000 - 17000" },
    { value: "17000 - 20000" },
    { value: "20000 - 23000" },
  ];

  const priceHandler = (event) => {
    setState((prev) => ({ ...prev, price: event.target.value }));
  };

  return (
    <FormControl>
      <FormLabel my="-1" fontWeight="bold">
        Price
      </FormLabel>
      <Select variant="flushed" onChange={priceHandler}>
        {prices.map((price, index) => {
          return (
            <option key={index}>
              {price.value}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default PriceFilter;
