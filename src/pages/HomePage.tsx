import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { StartModal } from "../components";
import {
  HomePageWrapper,
  HomeTitleWrapper,
  HomeTitle,
  Sircle,
  Cursor,
  StartButton,
} from "./HomePage.styled";

export const HomePage = () => {
  const { t } = useTranslation();

  const [isModalVisible, togglemodalVisible] = useState<boolean>(false);

  const handleModalVisible = useCallback(() => {
    togglemodalVisible((isModalVisible) => !isModalVisible);
  }, []);

  return (
    <HomePageWrapper data-testid={'home-page'}>
      <HomeTitleWrapper>
        <HomeTitle>
          Touch
          <Cursor src="./cursor.svg" />
          <Sircle />
        </HomeTitle>
        <StartButton tabIndex={4} onClick={handleModalVisible}>
          {t("startBtn")}
        </StartButton>
      </HomeTitleWrapper>
      {isModalVisible && (
        <StartModal isOpen={isModalVisible} handleClose={handleModalVisible} />
      )}
    </HomePageWrapper>
  );
};
