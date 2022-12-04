import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
// import { HouseContext } from '../../context/HouseContext';

const PropertyTypeFilter = ({ state, setState }) => {
  //   const {houses, property, setProperty, properties} = useContext(HouseContext);

  const propertyHandler = (event) => {
    setState((prev) => ({ ...prev, type: event.target.value }));
  };

  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (state.category === "Flat") {
      setArr(() => ["All", "1 bhk", "2 bhk", "3 bhk"]);
    }
    if (state.category === "Items") {
      setArr(() => ["All", "books", "stationary", "utensils", "home"]);
    }
  }, [state]);

  const filter = ["book", "pencil"];

  return (
    <FormControl>
      <FormLabel my="-1" fontWeight="bold">
        Type
      </FormLabel>
      <Select variant="flushed" onChange={propertyHandler}>
        {arr.map((type, index) => {
          return <option key={index}>{type}</option>;
        })}
      </Select>
    </FormControl>
  );
};

export default PropertyTypeFilter;
