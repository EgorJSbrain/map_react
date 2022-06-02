import { useEffect, useState } from "react";

import { PlaceType } from "./types/place";
import { position } from "./constants/global";
import { getPlaceAdress } from "./clientApi";
import s from "./app.module.css";
import { Map, Search } from "./components";

const App = () => {
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
    <div className={s.appWrapper}>
      <Search handleSetPosition={handleSetPosition} />
      {selectPosition && (
        <Map
          selectPosition={selectPosition}
          handleSetPosition={handleSetPosition}
        />
      )}
    </div>
  );
};

export default App;
