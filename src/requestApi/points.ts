import { AxiosResponse } from "axios";
import { instanceApi } from "../axios";
import { PointDto, PointType } from "../types/points";

export const pointsApi = {
  getAll: async () => {
    const { data } = await instanceApi.get<AxiosResponse<PointType[]>>(
      "points"
    );

    return data;
  },
  create: async (place: PointDto) => {
    const { data } = await instanceApi.post<AxiosResponse<PointType>>(
      "points",
      {
        ...place,
      }
    );

    return data;
  },
  edit: async (place: PointType) => {
    const { data } = await instanceApi.patch<AxiosResponse<PointType>>(
      `points/${place.id}`,
      {
        ...place,
      }
    );

    return data;
  },
  delete: async (id: number) => {
    const { data } = await instanceApi.delete(`points/${id}`);

    return data;
  },
};
