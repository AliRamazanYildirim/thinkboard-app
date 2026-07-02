import apiClient from "./axios";

export const fetchSubscriptionStatus = async () => {
  try {
    const response = await apiClient.get("/subscription-webhook/status");
    return { status: response.data.status, daysOverdue: response.data.daysOverdue };
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return { status: "active", daysOverdue: 0 };
  }
};
