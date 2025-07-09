import * as redis from "redis";

const postRedisClient = redis.createClient({
  url: "redis://localhost:6379/0",
  legacyMode: true,
});
postRedisClient.connect().then().catch(console.error);
const postCache = postRedisClient.v4;

export default postCache;
