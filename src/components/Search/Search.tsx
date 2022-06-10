import { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { PlaceType } from "../../types/place";
import { SearchList } from "./SearchList";
import { useCheckScreenSize } from "../../hooks/useCheckScreenSize";
import { searchPlaces } from "../../requestApi";
import { debounce } from "../../utils/debounce";

type SearchProps = {
  handleSetPosition: (value: PlaceType) => void
}

const Input = styled(TextField)`
  width: 100%;

  @media (max-width: 720px) {
    .MuiInput-input {
      padding: 4px 12px 5px;
    }
  }
`

const SearchWrapper = styled.div`
  position: relative;
  margin: 40px auto;
  max-width: 1000px;

  @media (min-width: 720px) {
    padding: 0 24px;
  }
`;

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
