import { PlaceType } from "./place";


export type PointDto = {
  place: PlaceType,
  description: string;
};

export type PointType = {
  id: number;
} & PointDto;
