import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "60 s"), // 3 requests every 60 seconds
    analytics: true, // Enable analytics to track rate limit usage
    prefix: "thinkboard_ratelimit", // Prefix for Redis keys to avoid conflicts
});

export default rateLimit;