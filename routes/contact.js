import express from 'express';
import { forwardMessage } from '../controllers/contactController.js';
import { contactFormLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Forward user message.
router.post('/', contactFormLimiter, forwardMessage);

export default router;