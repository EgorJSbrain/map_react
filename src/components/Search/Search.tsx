import { useCallback, useState } from "react";
import { OutlinedInput } from "@mui/material";
import { useDebouncedCallback } from 'use-debounce';
import { searchPlaces } from "../../clientApi";
import { PlaceType } from "../../types/place";
import { SearchList } from "./SearchList";
import s from './Search.module.css';

type SearchProps = {
  handleSetPosition: (value: PlaceType) => void
}

export const Search = ({ handleSetPosition }: SearchProps) => {
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const [isListVisible, setListVisible] = useState(false);

  const debouncedRequest = useDebouncedCallback(
    async (value) => {
      const data: PlaceType[] = await searchPlaces(value);

      if (data) {
        setListPlace(data);
        setListVisible(true)
      }
    },
    500
  );

  const handleChange = useCallback((value: string) => {
    try {
      debouncedRequest(value);
    } catch (e) {
        console.log(e)
    }
  }, []);

  const onClick = useCallback((item: PlaceType) => {
    setListVisible(false);
    handleSetPosition(item);
  }, []);

  return (
    <div className={s.searchWrapper}>
      <OutlinedInput
        placeholder="Address"
        style={{ width: "100%" }}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />

      {isListVisible && (
        <SearchList
          listPlace={listPlace}
          onClick={onClick}
        />
      )}
    </div>
  );
}
