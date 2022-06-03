import styled from "styled-components";

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
  color: #1d1a39;
  user-select: none;
  padding-top: 20px;
  margin-top: 36px;

  :hover {
    cursor: pointer;
    animation-name: shake;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
`;

export const HomePage = () => (
  <HomePageWrapper>
    <HomeTitleWrapper>
      <HomeTitle>Touch</HomeTitle>
      <HomeTitle>The World</HomeTitle>
      <StartButton tabIndex={4}>START</StartButton>
    </HomeTitleWrapper>
  </HomePageWrapper>
);
