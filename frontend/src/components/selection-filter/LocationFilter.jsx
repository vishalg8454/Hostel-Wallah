import { FormControl, FormLabel, Select } from "@chakra-ui/react";
// import { useContext } from 'react';
// import { HouseContext } from '../../context/HouseContext';

const LocationFilter = ({ state, setState }) => {
  //   const {country, setCountry, countries} = useContext(HouseContext);

  const locationHandler = (event) => {
    setState((prev) => ({ ...prev, category: event.target.value }));
  };
  const countries = ["Flat ", "Items"];
  return (
    <FormControl>
      <FormLabel my="-1" fontWeight="bold">
        Flat/Items?
      </FormLabel>
      <Select variant="flushed" onChange={locationHandler}>
        {countries.map((country, index) => {
          return (
            <option key={index}>
              {country}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default LocationFilter;
