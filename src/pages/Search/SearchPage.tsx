import { useCallback, useEffect, useState } from "react";
import { Map, Search } from "../../components";
import { PlaceModal } from "../../components/Modals";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { placeApi } from "../../requestApi";
import { pointsAllRequest } from "../../store/actions";
import { userSet } from "../../store/reducers/authSlice";
import { PlaceType } from "../../types/place";
import { AddPlace, AddPlaceIcon, AppWrapper } from "./SearchPage.styled";

export const SearchPage = () => {
  const [selectedPosition, setSelectedPosition] = useState<PlaceType | null>(null);
  const [homePosition, setHomePosition] = useState<PlaceType | null>(null);
  const [isCreatePlaceModal, setCreateModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { points } = useAppSelector(state => state.points)

  useEffect(() => {
    (async function () {
      const user = localStorage.getItem("user");
      dispatch(pointsAllRequest());

      if (user) {
        const parsedUser = JSON.parse(user)
        dispatch(userSet(parsedUser));

        if (!selectedPosition && user) {
          const currentPlace: PlaceType = await placeApi.getPlaces(
            Number(parsedUser.address.lat),
            Number(parsedUser.address.lon)
          );

          if (currentPlace) {
            setHomePosition(currentPlace);
          }
        }

      }
    })();
  }, []);

  const handleSetPosition = useCallback((position: PlaceType) => {
    setSelectedPosition(position);
  }, []);

  const handleModalVisible = useCallback(() => {
    selectedPosition && setCreateModal((isModalVisible) => !isModalVisible);
  }, [selectedPosition]);

  return (
    <AppWrapper data-testid={"search-page"}>
      <Search handleSetPosition={handleSetPosition} />

      {(selectedPosition || homePosition) && (
        <Map
          selectPosition={selectedPosition}
          homePosition={homePosition}
          handleSetPosition={handleSetPosition}
          points={points}
        />
      )}
      <AddPlace onClick={handleModalVisible}>
        <AddPlaceIcon />
      </AddPlace>

      {selectedPosition && (
        <PlaceModal
          isOpen={isCreatePlaceModal}
          handleClose={handleModalVisible}
          selectedPosition={selectedPosition}
        />
      )}
    </AppWrapper>
  );
}