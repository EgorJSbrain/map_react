import { PlaceType } from "./place";

export type PointDto = {
  description: string;
  userId: number;
} & PlaceType;

export type PointType = {
  id: number;
} & PointDto;
