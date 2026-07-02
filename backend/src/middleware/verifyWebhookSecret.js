const verifyWebhookSecret = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const expected = `Bearer ${process.env.SUBSCRIPTION_WEBHOOK_SECRET}`;

    if (authHeader !== expected) {
        return res.status(401).json({ message: 'Nicht autorisiert.' });
    }

    next();
};

export default verifyWebhookSecret;
