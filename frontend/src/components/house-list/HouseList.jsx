import { Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";

// import { HouseContext } from "../../context/HouseContext";
import { CardItem } from "../../components";

const HouseList = ({ houses }) => {
  //   const { houses } = useContext(HouseContext);

//   useEffect(() => {
//     console.log(houses);
//   }, [houses]);

  if (houses.length === 0) {
    return (
      <Heading size="lg" p="10" align="center">
        Oops... Can try another one?
      </Heading>
    );
  }
  return (
    <Grid
      my="8"
      gap="4"
      gridTemplateColumns="repeat(auto-fit, minmax(300px,1fr))"
    >
      {houses.map((house) => {
        return <CardItem house={house} key={house.id} />;
      })}
    </Grid>
  );
};

export { HouseList };
