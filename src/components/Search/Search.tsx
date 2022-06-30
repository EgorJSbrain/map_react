import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaceType } from '../../types/place';
import { useCheckScreenSize } from '../../hooks';
import { debounce } from '../../utils';
import { placeApi } from '../../requestApi';
import { Input, SearchWrapper } from './Search.styled';
import { SearchList } from './SearchList';

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
      // eslint-disable-next-line no-console
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
        variant={isMobile ? 'standard' : 'outlined'}
        placeholder={t('address')}
        onChange={(event) => {
          debouncedChange(event.target.value);
        }}
      />

      {isListVisible && <SearchList listPlace={listPlace} onClick={onClick} />}
    </SearchWrapper>
  );
};
