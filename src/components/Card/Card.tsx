import { Typography } from "@mui/material";
import { CardType } from "../../types";
import { CardDescription, CardItem, CardStatus, ImgBox, Info, PhotoIcon } from "./styled";

interface CardProps {
  card: CardType;
}

export const Card = ({card}: CardProps) => {
  return (
    <CardItem>
      <ImgBox>
        <PhotoIcon />
      </ImgBox>

      <Info>
        <Typography>
          {card.point.display_name}
        </Typography>

        <CardDescription placeholder="Set description"/>
      </Info>

      {card.status && <CardStatus>{card.status}</CardStatus>}
    </CardItem>
  )
}