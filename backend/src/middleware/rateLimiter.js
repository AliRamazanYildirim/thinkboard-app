import rateLimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-limit-key");
        if (!success) return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Rate limiter error:', error);
        next(error); // Pass the error to the next middleware
    }
};

export default rateLimiter;
