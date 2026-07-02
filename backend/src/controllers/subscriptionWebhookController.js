import SubscriptionStatus from "../models/SubscriptionStatus.js";

const VALID_STATUSES = ['active', 'warning', 'restricted', 'suspended'];

export const handleSubscriptionWebhook = async (req, res) => {
  try {
    const { customerId, serviceId, status, daysOverdue, nextActionDate } = req.body;

    if (
      process.env.SUBSCRIPTION_WEBHOOK_SERVICE_ID &&
      serviceId !== process.env.SUBSCRIPTION_WEBHOOK_SERVICE_ID
    ) {
      return res.status(200).json({ received: true, ignored: true });
    }

    if (!customerId || typeof customerId !== 'string') {
      return res.status(400).json({ message: 'customerId ist erforderlich und muss eine Zeichenfolge sein.' });
    }

    if (!serviceId || typeof serviceId !== 'string') {
      return res.status(400).json({ message: 'serviceId ist erforderlich und muss eine Zeichenfolge sein.' });
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `status muss einer der folgenden Werte sein: ${VALID_STATUSES.join(', ')}.` });
    }

    if (typeof daysOverdue !== 'number' || Number.isNaN(daysOverdue)) {
      return res.status(400).json({ message: 'daysOverdue muss eine Zahl sein.' });
    }

    if (nextActionDate !== null && nextActionDate !== undefined) {
      const parsedDate = new Date(nextActionDate);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'nextActionDate muss null oder ein gültiges ISO-Datum sein.' });
      }
    }

    const existingStatus = await SubscriptionStatus.findOne({ customerId, serviceId });

    if (existingStatus && existingStatus.status === status) {
      return res.status(200).json({ received: true, noop: true });
    }

    await SubscriptionStatus.findOneAndUpdate(
      { customerId, serviceId },
      { status, daysOverdue, nextActionDate: nextActionDate ?? null },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling subscription webhook:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSubscriptionStatus = async (_, res) => {
  try {
    const latestStatus = await SubscriptionStatus.findOne().sort({ updatedAt: -1 });

    if (!latestStatus) {
      return res.status(200).json({ status: 'active', daysOverdue: 0, nextActionDate: null });
    }

    res.status(200).json({
      status: latestStatus.status,
      daysOverdue: latestStatus.daysOverdue,
      nextActionDate: latestStatus.nextActionDate
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(200).json({ status: 'active', daysOverdue: 0, nextActionDate: null });
  }
};
