import { instanceApi } from "../axios";
import { UserTypeDto } from "../types";

export const userApi = {
  getAll: async () => {
    const { data } = await instanceApi.get("users");

    return data;
  },
  register: async (userData: UserTypeDto) => {
    const { data } = await instanceApi.post("users", {
      ...userData,
    });

    return data;
  },
};
