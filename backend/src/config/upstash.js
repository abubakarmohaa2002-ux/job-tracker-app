import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client from environment variables
const redis = Redis.fromEnv();

// Configure rate limiter: 100 requests per minute per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;