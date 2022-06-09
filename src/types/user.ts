import { AddressType, PlaceType } from "./place";

export type UserType = {
  firstName: string;
  secondName: string;
  address: PlaceType;
  email: string;
  password: string;
}

export type UserLogInData = {
  password: string;
  email: string
}
