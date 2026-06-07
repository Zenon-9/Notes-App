import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window
    standardHeaders: 'draft-7', // draft-7: combined RateLimit header
    legacyHeaders: false, // Disable the X-RateLimit-* headers
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    },
    statusCode: 429,
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 15, // Limit each IP to 15 requests per window (stricter for auth)
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        message: 'Too many authentication attempts from this IP, please try again after 15 minutes.'
    },
    statusCode: 429,
});
