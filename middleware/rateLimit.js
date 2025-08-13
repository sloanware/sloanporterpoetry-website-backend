import rateLimit from 'express-rate-limit';

// Limits each IP to 3 requests per 1 minute window.
const contactFormLimiter = rateLimit({
    windowMs: 60000,
    max: 3,
    message: { msg: 'Too many submissions. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Limits each IP to 3 requests per 30 second window.
const newsletterLimiter = rateLimit({
    windowMs: 30000,
    max: 3,
    message: { msg: 'Too many submission. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

export default {contactFormLimiter, newsletterLimiter};