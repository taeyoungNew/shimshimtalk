import * as redis from "redis";
import { RedisClientType } from "redis";

const userPostsRedisClient: RedisClientType = redis.createClient({
  url: "redis://localhost:6379/0",
  legacyMode: true,
});
userPostsRedisClient.connect().then().catch(console.error);

export const userPostsCache = userPostsRedisClient.v4;
