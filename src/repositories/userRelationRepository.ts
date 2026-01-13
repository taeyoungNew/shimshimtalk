import { col, Op, QueryTypes, where } from "sequelize";
import logger from "../config/logger";
import db, { sequelize } from "../database/models/index";

const { Follows, Users, UserInfos, ChatRooms } = db;
class UserRelationRepository {
  public getFriends = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRelationRepository",
      functionName: "getFriends",
    });
    try {
      return db.sequelize.query(
        `
          SELECT follow1.followingId AS friendId,
                users.email,
                userInfos.nickname,
                chatRooms.id AS chatRoomId
            FROM follows follow1
            JOIN follows follow2
              ON follow1.followerId = follow2.followingId
            AND follow1.followingId = follow2.followerId
            JOIN users users
              ON users.id = follow1.followingId
            JOIN userinfos userInfos
              ON userInfos.userId = users.id
            LEFT JOIN chatrooms chatRooms
              ON (
                  (chatRooms.userAId = follow1.followerId AND chatRooms.userBId = follow1.followingId)
                OR (chatRooms.userAId = follow1.followingId AND chatRooms.userBId = follow1.followerId)
                )
           WHERE follow1.followerId = :userId
        `,
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
        }
      );
    } catch (error) {
      throw error;
    }
  };
  public getFollowings = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRelationRepository",
      functionName: "getFollowings",
    });
    try {
      return await Follows.findAll({
        where: { followerId: userId },
        attributes: ["id", "followingId"],
        include: [
          {
            association: Follows.associations.following,
            required: false, // 중요
            attributes: ["id", "email"],
            include: [
              {
                association:
                  Follows.associations.following.target.associations.UserInfo,
                attributes: ["nickname"],
              },
            ],
          },
        ],
        raw: true,
      });
      // console.log("rows = ", rows);

      // return await Follows.findAll({
      //   attributes: ["followingId"],
      //   include: [
      //     {
      //       association: Follows.associations.following,
      //       attributes: ["id"],
      //       include: [
      //         {
      //           association:
      //             Follows.associations.following.target.associations.UserInfo,
      //           attributes: ["nickname"],
      //         },
      //       ],
      //     },
      //   ],
      //   where: {
      //     followerId: userId,
      //   },
      // });
    } catch (error) {
      throw error;
    }
  };
}

export default UserRelationRepository;
