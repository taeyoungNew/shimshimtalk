import { QueryTypes } from "sequelize";
import db from "../database/models/index";

const { Users } = db;

class SuggestedUserRepository {
  public getPopularUsers = async (userId: string) => {
    return await db.sequelize.query(
      `
          SELECT users.id,
                  userinfos.nickname, 
                  COUNT(follows.followerId) AS followerCnt
            FROM Users users
            JOIN UserInfos userinfos
              ON users.id = userinfos.userId
            LEFT JOIN Follows follows	
              ON follows.followingId = users.id
           WHERE users.id != 'd87b2c08-94d5-4173-8bd5-72e3128d9361'
             AND follows.followerId != 'd87b2c08-94d5-4173-8bd5-72e3128d9361'
             AND users.id NOT IN (
              SELECT f1.followingId
                    FROM Follows f1
                    JOIN Follows f2
                      ON f1.followingId = f2.followerId
                AND f1.followerId = f2.followingId
              WHERE f1.followerId = 'd87b2c08-94d5-4173-8bd5-72e3128d9361'
            )
          GROUP BY users.id, userinfos.nickname
          ORDER By followerCnt DESC`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      },
    );
  };
  public getSuggestedUsers = async (userId: string) => {
    return await db.sequelize.query(
      `SELECT users.id,
	          userinfos.nickname,
              COUNT(distinct follows2.followerId) AS  mutualFriendsCount
         FROM Users users
         JOIN Userinfos userinfos
           ON users.id = userinfos.userId
         LEFT JOIN Follows follows1  
           ON follows1.followerId = :userId
         LEFT JOIN Follows follows2
           ON follows2.followerId = follows1.followingId
          AND follows2.followingId = users.id
        WHERE users.id != :userId 
          AND users.id NOT IN (
            SELECT f1.followingId
              FROM follows f1
              JOIN follows f2
                ON f1.followingId = f2.followerId
               AND f1.followerId = f2.followingId
             WHERE f1.followerId = :userId 
               AND f1.followingId = users.id)
        GROUP BY users.id, userinfos.nickname
        ORDER BY mutualFriendsCount DESC`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      },
    );
  };
}

export default SuggestedUserRepository;
