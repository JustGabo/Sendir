"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscription } from "@/app/hooks/useSubscription";

export const useSubscriptionPage = () => {
  const { user } = useAuth();
  const {
    subscription,
    isLoading,
    isCreatingSubscription,
    isAccessingPortal,
    isCancellingSubscription,
    handleSubscriptionPortal,
    handleCancelSubscription,
    handleCreateSubscription
  } = useSubscription(user?.id);

  const isSubscribed = subscription?.subscription_status === 'active';

  return {
    subscription,
    isLoading,
    isSubscribed,
    isCreatingSubscription,
    isAccessingPortal,
    isCancellingSubscription,
    handleSubscriptionPortal,
    handleCancelSubscription,
    handleCreateSubscription,
    subscriptionStatus: subscription?.subscription_status,
    subscriptionEnd: subscription?.subscription_end,
  };
}; 