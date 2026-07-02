import { model, Schema } from "mongoose";

const subscriptionStatusSchema = new Schema({
  customerId: {
    type: String,
    required: true,
    trim: true
  },
  serviceId: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'warning', 'restricted', 'suspended'],
    required: true
  },
  daysOverdue: {
    type: Number,
    required: true,
    default: 0
  },
  nextActionDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false,
});

// Idempotenz-Schlüssel ist service-bezogen, nicht nur customer-bezogen
subscriptionStatusSchema.index({ customerId: 1, serviceId: 1 }, { unique: true });

const SubscriptionStatus = model("SubscriptionStatus", subscriptionStatusSchema);

export default SubscriptionStatus;
