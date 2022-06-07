import { instanceApi } from "../axios";
import { UserType } from "../types";

export const signUpUser = (data: UserType) => {
  instanceApi.post('/profiles', data)
}
