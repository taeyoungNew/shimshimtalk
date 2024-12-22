import Users from "../database/models/users";

export interface tokenType {
  token: string | Users;
  type: string;
}
