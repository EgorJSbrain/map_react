import { PlaceType } from "./place";


export type PointDto = {
  description: string;
} & PlaceType;

export type PointType = {
  id: number;
} & PointDto;
