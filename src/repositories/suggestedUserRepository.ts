import { QueryTypes } from "sequelize";
import db from "../database/models/index";

const { Users } = db;

class SuggestedUserRepository {
  public getPopularUsers = async (userId: string) => {
    return await db.sequelize.query(
      `SELECT users.id AS userId,
              userinfos.nickname, 
              COUNT(follows.followerId) AS followerCnt,
              CASE 
                WHEN myFollow.followingId IS NOT NULL THEN TRUE
                ELSE FALSE
               END AS isFollowinged 
        FROM Users users
        JOIN UserInfos userinfos
          ON users.id = userinfos.userId
        LEFT JOIN Follows follows	
          ON follows.followingId = users.id
        LEFT JOIN Follows myFollow
          ON myFollow.followerId = :userId
         AND myFollow.followingId = users.id
       WHERE users.id != :userId
         AND follows.followerId != :userId
         AND myFollow.followingId IS NULL
         AND users.id NOT IN (
          SELECT f1.followingId
            FROM Follows f1
            JOIN Follows f2
              ON f1.followingId = f2.followerId
             AND f1.followerId = f2.followingId
           WHERE f1.followerId = :userId
         )
       GROUP BY users.id, userinfos.nickname
       HAVING followerCnt >= 3
       ORDER BY followerCnt DESC, RAND()
       LIMIT 50`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      },
    );
  };
  public getSuggestedUsers = async (userId: string) => {
    return await db.sequelize.query(
      `SELECT users.id AS userId,
	            userinfos.nickname,
              COUNT(distinct follows2.followerId) AS  mutualFriendsCount,
              CASE 
                WHEN myFollow.followingId IS NOT NULL THEN TRUE
                ELSE FALSE
               END AS isFollowinged 
         FROM Users users
         JOIN Userinfos userinfos
           ON users.id = userinfos.userId
         LEFT JOIN Follows follows1  
           ON follows1.followerId = :userId
         LEFT JOIN Follows follows2
           ON follows2.followerId = follows1.followingId
          AND follows2.followingId = users.id
         LEFT JOIN Follows myFollow
           ON myFollow.followerId = :userId
          AND myFollow.followingId = users.id
        WHERE users.id != :userId 
          AND myFollow.followingId IS NULL
          AND NOT EXISTS (
            SELECT 1
              FROM Follows f1
              JOIN Follows f2
                ON f1.followingId = f2.followerId
               AND f1.followerId = f2.followingId
             WHERE f1.followerId = :userId 
               AND f1.followingId = users.id)
        GROUP BY users.id, userinfos.nickname
        HAVING mutualFriendsCount > 0  
        ORDER BY mutualFriendsCount DESC, RAND()`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      },
    );
  };
}

export default SuggestedUserRepository;
