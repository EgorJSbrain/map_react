import { instanceApi } from "../axios";
import { UserType } from "../types";

export const userApi = {
  getAll: async () =>  {
    const { data } = await instanceApi.get("users");

    return data;
  },
  register: async (userData: UserType) => {
    const { data } = await instanceApi.post("users", {
      ...userData
    });

    return data;
  }
};
