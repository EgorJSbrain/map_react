import { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, Search } from "../components";
import { position } from "../constants";
import { getPlaceAdress } from "../requestApi";
import { PlaceType } from "../types/place";

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 66px;
`;

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