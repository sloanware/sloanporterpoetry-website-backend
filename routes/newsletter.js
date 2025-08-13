import express from 'express';
import { } from '../controllers/newsletterController.js';
import { } from '../middleware/rateLimit.js';

const router = express.Router();

// Add email to subscriber list
router.post('/', newsletterLimiter, addEmail);

export default router;