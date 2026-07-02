import express from 'express';
import { handleSubscriptionWebhook, getSubscriptionStatus } from '../controllers/subscriptionWebhookController.js';
import verifyWebhookSecret from '../middleware/verifyWebhookSecret.js';

const router = express.Router();

router.post('/', verifyWebhookSecret, handleSubscriptionWebhook);
router.get('/status', getSubscriptionStatus);

export default router;
