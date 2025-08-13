import rateLimit from 'express-rate-limit';

// Limits each IP to 3 requests per 1 minute window.
export const contactFormLimiter = rateLimit({
    windowMs: 60000,
    max: 3,
    message: { msg: 'Too many submissions. Please try again in 1 minute.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Limits each IP to 3 requests per 30 second window.
export const newsletterLimiter = rateLimit({
    windowMs: 30000,
    max: 3,
    message: { msg: 'Too many submission. Please try again 30 seconds.' },
    standardHeaders: true,
    legacyHeaders: false,
});