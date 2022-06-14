import { useEffect, useState } from "react";
import { Map, Search } from "../components";
import { position } from "../constants";
import { getPlaceAdress } from "../requestApi";
import { PlaceType } from "../types/place";
import { AppWrapper } from "./SearchPage.styled";

export const SearchPage = () => {
  const [selectPosition, setSelectPosition] = useState<PlaceType>();

  useEffect(() => {
    (async function () {
      if (!selectPosition) {
        const currentPlace: PlaceType = await getPlaceAdress(
          position[0],
          position[1]
        );

        if (currentPlace) {
          handleSetPosition(currentPlace);
        }
      }
    })();
  }, []);

  const handleSetPosition = (position: PlaceType) => {
    setSelectPosition(position);
  };
  return (
    <AppWrapper data-testid={'search-page'}>
      <Search handleSetPosition={handleSetPosition} />

      {selectPosition && (
        <Map
          selectPosition={selectPosition}
          handleSetPosition={handleSetPosition}
        />
      )}
    </AppWrapper>
  );
}