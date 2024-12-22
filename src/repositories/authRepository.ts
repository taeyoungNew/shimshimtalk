import Users from "../database/models/users";
class AuthRepository {
  public saveRefToken = async (refToken: string, userId: string) => {
    await Users.update(
      {
        refToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  };
}

export default AuthRepository;
