import { useCallback, useEffect, useState } from "react";
import { OutlinedInput, TextField } from "@mui/material";
import { useDebouncedCallback } from 'use-debounce';
import styled from "styled-components";
import { searchPlaces } from "../../clientApi";
import { PlaceType } from "../../types/place";
import { SearchList } from "./SearchList";
import { useCheckScreenSize } from "../../utils/useCheckScreenSize";

type SearchProps = {
  handleSetPosition: (value: PlaceType) => void
}

const Input = styled(TextField)`
  width: 100%;
`

const SearchWrapper = styled.div`
  position: relative;
  margin: 40px auto;
  max-width: 1000px;
`;

export const Search = ({ handleSetPosition }: SearchProps) => {
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const [isListVisible, setListVisible] = useState(false);
  const screenSize = useCheckScreenSize();
  const isMobile = screenSize < 720;

  const debouncedRequest = useDebouncedCallback(async (value) => {
    const data: PlaceType[] = await searchPlaces(value);

    if (data) {
      setListPlace(data);
      setListVisible(true);
    }
  }, 500);

  const handleChange = useCallback((value: string) => {
    try {
      debouncedRequest(value);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
          handleChange(event.target.value);
        }}
      />

      {isListVisible && <SearchList listPlace={listPlace} onClick={onClick} />}
    </SearchWrapper>
  );
}
