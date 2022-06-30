import { instanceApi } from "../axios";
import { authUserData } from "../types";

export const authApi = {
  auth: async (authData: authUserData) => {
    const { data } = await instanceApi.post("profile", {
      data: authData,
    });

    return data;
  },
  logOut: async () => {
    const { data } = await instanceApi.post("profile", {
      data: {},
    });

    return data;
  },
};
