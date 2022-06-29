import { instanceApi } from "../axios";
import { CardDto, CardType } from "../types";

export const cardsApi = {
  getAll: async () => {
    const { data } = await instanceApi.get<{data: CardType[]}>('cards');

    return data;
  },
  create: async (place: CardDto) => {
    const { data } = await instanceApi.post<{data: CardType}>('cards', {
      ...place
    })

    return data;
  },
  edit: async (place: CardType) => {
    const { data } = await instanceApi.patch<{data: CardType}>(`cards/${place.id}`, {
      ...place
    })

    return data;
  },
  delete: async (id: number) => {
    const { data } = await instanceApi.delete(`cards/${id}`);

    return data;
  }
};
