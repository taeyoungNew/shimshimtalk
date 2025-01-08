export interface UserInfoType {
  id: string;
  email: string;
  password: string;
  UserInfo: {
    username: string | null;
    nickname: string | null;
    aboutMe: string | null;
    age: number | null;
  };
}
