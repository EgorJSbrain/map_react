import { PointType } from "./points";

export enum CardStatuses {
  new = "NEW",
  updated = "UPDATED",
}

enum CardTypes {
  sightsign = "sightsign",
  eat = "eat",
  museum = "museum",
}

export type CardDto = {
  point: PointType;
  description: string;
  status?: string;
};

export type CardType = {
  id: number;
} & CardDto;
