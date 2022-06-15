import { useCallback, useEffect, useState } from "react";
import { PlaceType } from "../../types/place";
import { SearchList } from "./SearchList";
import { useCheckScreenSize } from "../../hooks";
import { searchPlaces } from "../../requestApi";
import { debounce } from "../../utils";
import { Input, SearchWrapper } from "./Search.styled";

type SearchProps = {
  handleSetPosition: (value: PlaceType) => void
}

export const Search = ({ handleSetPosition }: SearchProps) => {
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const [isListVisible, setListVisible] = useState(false);
  const screenSize = useCheckScreenSize();
  const isMobile = screenSize < 720;

  const searchRequest = useCallback(async (value: string) => {
    try {
      const data: PlaceType[] = await searchPlaces(value);

      if (data) {
        setListPlace(data);
        setListVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const debouncedChange = debounce(searchRequest, 500);

  const onClick = useCallback((item: PlaceType) => {
    setListVisible(false);
    handleSetPosition(item);
  }, []);

  return (
    <SearchWrapper>
      <Input
        variant={isMobile ? "standard" : "outlined"}
        placeholder="Address"
        onChange={(event) => {
          debouncedChange(event.target.value);
        }}
      />

      {isListVisible && <SearchList listPlace={listPlace} onClick={onClick} />}
    </SearchWrapper>
  );
}
