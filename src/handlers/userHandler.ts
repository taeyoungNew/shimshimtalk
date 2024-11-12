import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/reponse";

export function userSignup(
  req: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  res: Response<User> // res의 타입을 지정
) {
  req.customField;
  res.status(201).send({
    id: 1,
    username: "anson",
    email: "dndbxhd10@naver.com",
  });
  return;
}
export function userInfo(req: Request, res: Response) {
  // req.sessionID
  res.send({});
}

export function usersInfo(req: Request, res: Response) {
  res.status(201).send("하이하이");
}
export function editUserInfo(req: Request, res: Response) {}
export function deleteId(req: Request, res: Response) {}
