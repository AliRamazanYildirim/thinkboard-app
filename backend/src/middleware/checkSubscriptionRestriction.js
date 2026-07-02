import SubscriptionStatus from "../models/SubscriptionStatus.js";

const RESTRICTED_STATUSES = ['restricted', 'suspended'];

const checkSubscriptionRestriction = async (_, res, next) => {
    try {
        const query = process.env.SUBSCRIPTION_WEBHOOK_SERVICE_ID
            ? { serviceId: process.env.SUBSCRIPTION_WEBHOOK_SERVICE_ID }
            : {};

        const latestStatus = await SubscriptionStatus.findOne(query).sort({ updatedAt: -1 });

        if (latestStatus && RESTRICTED_STATUSES.includes(latestStatus.status)) {
            return res.status(403).json({ message: 'Neue Notizen können derzeit nicht erstellt werden. Dieses Konto ist überfällig.' });
        }

        next();
    } catch (error) {
        console.error('Error checking subscription restriction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default checkSubscriptionRestriction;
