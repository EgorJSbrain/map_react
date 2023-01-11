import { PointType } from "./points";

export enum CardStatuses {
  new = "NEW",
  updated = "UPDATED",
}

export type CardDto = {
  point: PointType;
  description: string;
  status?: string;
};

export type CardType = {
  id: number;
} & CardDto;
