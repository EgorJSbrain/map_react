import { useEffect, useState } from "react";
import { Map, Search } from "../../components";
import { position } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPlaceAdress } from "../../requestApi";
import { userSet } from "../../store/reducers/authSlice";
import { PlaceType } from "../../types/place";
import { AppWrapper } from "./SearchPage.styled";

export const SearchPage = () => {
  const [selectPosition, setSelectPosition] = useState<PlaceType | null>(null);
  const [homePosition, setHomePosition] = useState<PlaceType | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth)

  // useEffect(() => {
  //   const user = localStorage.getItem('user');

  //   if (user) {
  //     dispatch(userSet(JSON.parse(user)));
  //   }
  // }, []);

  useEffect(() => {
    (async function () {
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user)
        dispatch(userSet(parsedUser));

        if (!selectPosition && user) {
          const currentPlace: PlaceType = await getPlaceAdress(
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

  const handleSetPosition = (position: PlaceType) => {
    setSelectPosition(position);
  };

  return (
    <AppWrapper data-testid={'search-page'}>
      <Search handleSetPosition={handleSetPosition} />

      {(selectPosition || homePosition) && (
        <Map
          selectPosition={selectPosition}
          homePosition={homePosition}
          handleSetPosition={handleSetPosition}
        />
      )}
    </AppWrapper>
  );
}