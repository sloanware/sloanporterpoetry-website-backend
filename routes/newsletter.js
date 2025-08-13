import express from 'express';
import { addEmail } from '../controllers/newsletterController.js';
import { newsletterLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Add email to subscriber list
router.post('/', newsletterLimiter, addEmail);

export default router;