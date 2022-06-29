import { useEffect } from "react";
import { Card } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { cardsAllRequest } from "../../store/actions";
import { AppWrapper, CardsWrapper } from "./styled";

export const CardsPage = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(state => state.cards);
  console.log("cards", cards)

  useEffect(() => {
    dispatch(cardsAllRequest())
  }, []);

  return (
    <AppWrapper>
      <CardsWrapper>
        {cards.map(card => <Card key={card.id} card={card}/>)}
      </CardsWrapper>
    </AppWrapper>
  )
};
