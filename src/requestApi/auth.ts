import { instanceApi } from "../axios";
import { authUserData } from "../types";

export const authUserRequest = async (authData: authUserData) => {
  const { data } = await instanceApi.post("profile", {
    data: authData
  });

  return data;
};

export const logOutUserRequest = async () => {
  const { data } = await instanceApi.post("profile", {
    data: {}
  });

  return data;
};
