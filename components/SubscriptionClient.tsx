"use client";
import React from 'react'
import SubscriptionHeader from '@/components/SubscriptionHeader'
import SubscriptionStatus from '@/components/SubscriptionStatus'
import SubscriptionPlan from '@/components/SubscriptionPlan'
import { useSubscriptionPage } from '@/app/hooks/useSubscriptionPage'

const important_information = [
  {
    title: 'Facturación mensual',
    description: 'Facturación mensual',
  },
  {
    title: 'Cancela en cualquier momento',
    description: 'Cancela en cualquier momento',
  }
];

const SubscriptionClient: React.FC = () => {
  const {
    isLoading,
    isSubscribed,
    isCreatingSubscription,
    isAccessingPortal,
    isCancellingSubscription,
    handleSubscriptionPortal,
    handleCancelSubscription,
    handleCreateSubscription,
    subscriptionStatus,
    subscriptionEnd,
  } = useSubscriptionPage();

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='space-y-8'>
        {/* Header */}
        <SubscriptionHeader />

        {/* Current Plan Status */}
        <SubscriptionStatus
          isLoading={isLoading}
          isSubscribed={isSubscribed}
          subscriptionStatus={subscriptionStatus}
          subscriptionEnd={subscriptionEnd}
        />

        {/* Plan Details */}
        <SubscriptionPlan
          isSubscribed={isSubscribed}
          isCreatingSubscription={isCreatingSubscription}
          isAccessingPortal={isAccessingPortal}
          isCancellingSubscription={isCancellingSubscription}
          handleSubscriptionPortal={handleSubscriptionPortal}
          handleCancelSubscription={handleCancelSubscription}
          handleCreateSubscription={handleCreateSubscription}
        />

        {/* Additional Information */}
        <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
          <h3 className='text-sm font-medium text-gray-900 mb-4'>
            Información importante
          </h3>
          <div className='text-sm text-gray-500 space-y-2'>
            {important_information.map((info, index) => (
              <p key={index} className='flex items-center'>• {info.title}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionClient; 