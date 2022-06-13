import { instanceApi } from "../axios";
import { UserType } from "../types";

export const usersAllRequest = async () => {
  const { data } = await instanceApi.get("users");

  return data;
};

export const userAddRequest = async (userData: UserType) => {
  const { data } = await instanceApi.post("usedrs", {
    data: userData
  });

  return data;
};