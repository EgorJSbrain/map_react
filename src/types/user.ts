import { PlaceType } from "./place";

export type UserTypeDto = {
  firstName: string;
  secondName: string;
  address: PlaceType;
  email: string;
  password: string;
};

export type UserType = {
  id: number;
} & UserTypeDto;
