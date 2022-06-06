import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { UserModal } from "../components";

const HomePageWrapper = styled.div`
  background: url('./home.jpeg');
  width: 100%;
  background-color: #f1fef9;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const HomeTitleWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15%;
  background-color: #5a5f1a14;
`;

const HomeTitle = styled.div`
  font-size: 114px;
  font-weight: 600;
  color: #fff;
`;

const StartButton = styled.div`
  width: 240px;
  height: 60px;
  border-radius: 38px;
  text-align: center;
  background-color: #ffe108;
  font-family: 'Archivo Black', sans-serif;;
  font-size: 36px;
  letter-spacing: 2px;
  // color: #1d1a39;
  user-select: none;
  padding-top: 6px;
  margin-top: 36px;

  :hover {
    cursor: pointer;
    animation-name: shake;
    animation-duration: .3s;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(5px, 5px) rotate(5deg); }
    50% { transform: translate(0, 0) rotate(0eg); }
    75% { transform: translate(-5px, 5px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
`;

export const HomePage = () => {
  const { t } = useTranslation();

  const [isModalVisible, togglemodalVisible] = useState<boolean>(false);

  const handleModalVisible = useCallback(() => {
    togglemodalVisible((isModalVisible) => !isModalVisible);
  }, []);

  return (
    <HomePageWrapper>
      <HomeTitleWrapper>
        <HomeTitle>Touch</HomeTitle>
        <HomeTitle>The World</HomeTitle>
        <StartButton tabIndex={4} onClick={handleModalVisible}>
          {t("startBtn")}
        </StartButton>
      </HomeTitleWrapper>
      {
        isModalVisible && <UserModal isOpen={isModalVisible} handleClose={handleModalVisible} />
      }
    </HomePageWrapper>
  );
};
