import * as redis from "redis";
import { RedisClientType } from "redis";

const onlineRedisClient: RedisClientType = redis.createClient({
  url: "redis://localhost:6379/0",
  legacyMode: true,
});
onlineRedisClient.connect().then().catch(console.error);
export const onlineCache = onlineRedisClient.v4;
