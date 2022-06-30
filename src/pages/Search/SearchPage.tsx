import { useCallback, useEffect, useState } from "react";
import { Map, Search } from "../../components";
import { PlaceModal } from "../../components/Modals";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { placeApi } from "../../requestApi";
import { cardCreate, pointDelete, pointsAllRequest } from "../../store/actions";
import { userSet } from "../../store/reducers/authSlice";
import { getPoints } from "../../store/selectors";
import { CardStatuses, PointType } from "../../types";
import { PlaceType } from "../../types/place";
import { AddPoint, AddPointIcon, AppWrapper } from "./styled";

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { points } = useAppSelector(getPoints);

  const [selectedPosition, setSelectedPosition] = useState<PlaceType | null>(
    null
  );
  const [editedPoint, setEditedPoint] = useState<PointType | null>(null);
  const [homePosition, setHomePosition] = useState<PlaceType | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const user = localStorage.getItem("user");
      dispatch(pointsAllRequest());

      if (user) {
        const parsedUser = JSON.parse(user);
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
  }, [selectedPosition, dispatch]);

  const handleSetPosition = useCallback(
    (position: PlaceType) => {
      setSelectedPosition(position);
    },
    [setSelectedPosition]
  );

  const handleModalVisible = useCallback(() => {
    setModalVisible((isModalVisible) => !isModalVisible);
  }, [setModalVisible]);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setEditedPoint(null);
    setSelectedPosition(null);
  }, [setSelectedPosition, setModalVisible, setEditedPoint]);

  const handlePointDelete = useCallback(
    (id: number) => {
      dispatch(pointDelete(id));
    },
    [dispatch]
  );

  const handlePointEdit = useCallback(
    (point: PointType) => {
      setEditedPoint(point);
      setModalVisible(true);
    },
    [setEditedPoint, setModalVisible]
  );

  const handleCardCreate = useCallback(
    (point: PointType) => {
      dispatch(
        cardCreate({
          point,
          description: "",
          status: CardStatuses.new,
        })
      );
    },
    [dispatch]
  );

  return (
    <AppWrapper data-testid="search-page">
      <Search handleSetPosition={handleSetPosition} />

      {(selectedPosition || homePosition) && (
        <Map
          selectPosition={selectedPosition}
          homePosition={homePosition}
          points={points}
          handleSetPosition={handleSetPosition}
          handlePointDelete={handlePointDelete}
          handlePointEdit={handlePointEdit}
          handleCardCreate={handleCardCreate}
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
};
