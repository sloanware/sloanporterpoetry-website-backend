import express from 'express';
import { } from '../controllers/contactController.js';
import { } from '../middleware/rateLimit.js';

const router = express.Router();

// Forward user message.
router.post('/', contactFormLimiter, forwardMessage);

export default router;