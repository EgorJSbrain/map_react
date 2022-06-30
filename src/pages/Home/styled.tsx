import styled from "styled-components";

export const HomePageWrapper = styled.div`
  background: url("./home.jpeg");
  width: 100%;
  background-color: #f1fef9;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

export const Cursor = styled.img`
  position: absolute;
  transform: rotate(-25deg);
  right: -52px;
  top: 112px;
  width: 90px;
  height: 90px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 2;
`;

export const Sircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgb(187 187 185) 56%,
    rgba(103, 34, 48, 0.16712622549019607) 94%
  );
  position: absolute;
  z-index: 1;
  opacity: 0.4;
  right: -16px;
  top: 98px;
`;

export const HomeTitleWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  background-color: #5a5f1a14;
`;

export const HomeTitle = styled.div`
  font-size: 114px;
  font-weight: 600;
  color: #fff;
  height: 130px;
  position: relative;
`;

export const StartButton = styled.div`
  width: 240px;
  height: 80px;
  border-radius: 38px;
  text-align: center;
  background-color: #ffe108;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 2px;
  user-select: none;
  padding-top: 12px;
  margin-top: 78px;

  :hover {
    cursor: pointer;
    animation-name: shake;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(5px, 5px) rotate(5deg);
    }
    50% {
      transform: translate(0, 0) rotate(0eg);
    }
    75% {
      transform: translate(-5px, 5px) rotate(-5deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;
