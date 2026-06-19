import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use IP-based limiting (better than global key)
    const ip = req.ip || "anonymous";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;