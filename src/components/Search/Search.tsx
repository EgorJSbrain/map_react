import { useCallback, useState } from "react";
import { PlaceType } from "../../types/place";
import { SearchList } from "./SearchList";
import { useCheckScreenSize } from "../../hooks";
import { debounce } from "../../utils";
import { Input, SearchWrapper } from "./Search.styled";
import { useTranslation } from "react-i18next";
import { placeApi } from "../../requestApi";

type SearchProps = {
  handleSetPosition: (value: PlaceType) => void
}

export const Search = ({ handleSetPosition }: SearchProps) => {
  const { t } = useTranslation();
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const [isListVisible, setListVisible] = useState(false);
  const screenSize = useCheckScreenSize();
  const isMobile = screenSize < 720;

  const searchRequest = useCallback(async (value: string) => {
    try {
      const response: PlaceType[] = await placeApi.search(value);

      if (response) {
        setListPlace(response);
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
  }, [handleSetPosition]);

  return (
    <SearchWrapper>
      <Input
        variant={isMobile ? "standard" : "outlined"}
        placeholder={t("address")}
        onChange={(event) => {
          debouncedChange(event.target.value);
        }}
      />

      {isListVisible && <SearchList listPlace={listPlace} onClick={onClick} />}
    </SearchWrapper>
  );
}
