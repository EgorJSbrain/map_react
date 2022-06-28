import { useCallback, useEffect, useState } from "react";
import { Map, Search } from "../../components";
import { PlaceModal } from "../../components/Modals";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { placeApi } from "../../requestApi";
import { pointDelete, pointsAllRequest } from "../../store/actions";
import { userSet } from "../../store/reducers/authSlice";
import { getPoints } from "../../store/selectors";
import { PointType } from "../../types";
import { PlaceType } from "../../types/place";
import { AddPoint, AddPointIcon, AppWrapper } from "./SearchPage.styled";

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { points } = useAppSelector(getPoints);

  const [selectedPosition, setSelectedPosition] = useState<PlaceType | null>(null);
  const [editedPoint, setEditedPoint] = useState<PointType | null>(null);
  const [homePosition, setHomePosition] = useState<PlaceType | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

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
    setModalVisible((isModalVisible) => !isModalVisible);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setEditedPoint(null);
    setSelectedPosition(null);
  }, []);

  const handlePointDelete = useCallback((id: number) => {
    dispatch(pointDelete(id));
  }, []);

  const handlePointEdit = useCallback((point: PointType) => {
    setEditedPoint(point);
    setModalVisible(true);
  }, []);

  return (
    <AppWrapper data-testid={"search-page"}>
      <Search handleSetPosition={handleSetPosition} />

      {(selectedPosition || homePosition) && (
        <Map
          selectPosition={selectedPosition}
          homePosition={homePosition}
          points={points}
          handleSetPosition={handleSetPosition}
          handlePointDelete={handlePointDelete}
          handlePointEdit={handlePointEdit}
        />
      )}

      <AddPoint onClick={handleModalVisible}>
        <AddPointIcon />
      </AddPoint>

      {(editedPoint || selectedPosition) && isModalVisible && (
        <PlaceModal
          isOpen={isModalVisible}
          handleClose={handleModalClose}
          selectedPosition={selectedPosition}
          editedPoint={editedPoint}
        />
      )}
    </AppWrapper>
  );
}