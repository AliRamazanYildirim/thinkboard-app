import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 requests every 60 seconds
    analytics: true, // Enable analytics to track rate limit usage
    prefix: "thinkboard_ratelimit", // Prefix for Redis keys to avoid conflicts
});

export default rateLimit;