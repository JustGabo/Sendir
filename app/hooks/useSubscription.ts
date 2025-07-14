import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | null

interface UserProfile {
  id: number
  user_id: string
  subscription_status: SubscriptionStatus
  subscription_start: string | null
  subscription_end: string | null
  customer_id: string | null
  subscription_id: string | null
}

export function useSubscription(userId: string | undefined) {
  const queryClient = useQueryClient()

  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', userId],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!userId) return null

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (error) {
          console.error('Error fetching subscription:', error)
          return null
        }

        return data
      } catch (error) {
        console.error('Error in subscription query:', error)
        return null
      }
    },
    enabled: !!userId
  })

  const handleSubscriptionPortal = async () => {
    if (!userId || !subscription?.customer_id) {
      throw new Error('No hay información de cliente disponible')
    }

    try {
      const response = await fetch('/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: subscription.customer_id,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al crear la sesión del portal')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error: any) {
      console.error('Error accessing portal:', error)
      throw new Error(error.message || 'Error al acceder al portal de suscripción')
    }
  }

  const handleCancelSubscription = async () => {
    if (!userId || !subscription?.subscription_id) {
      throw new Error('No hay suscripción activa')
    }

    try {
      const response = await fetch('/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.subscription_id,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al cancelar la suscripción')
      }

      // Actualizar el estado en Supabase
      const { error } = await supabase
        .from('user_profiles')
        .update({
          subscription_status: 'cancelled',
        })
        .eq('user_id', userId)

      if (error) throw error

      // Invalidar la query para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['subscription', userId] })
    } catch (error: any) {
      console.error('Error canceling subscription:', error)
      throw new Error(error.message || 'Error al cancelar la suscripción')
    }
  }

  const handleCreateSubscription = async () => {
    if (!userId) throw new Error('Usuario no autenticado')

    try {
      const response = await fetch('/create-polar-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_email: subscription?.customer_id, // Assuming customer_id is the email for now
          user_id: userId,
          customer_name: '', // You might want to get this from user metadata
        }),
      })

      if (!response.ok) {
        throw new Error('Error al crear la sesión de suscripción')
      }

      const { checkoutUrl } = await response.json()
      window.location.href = checkoutUrl
    } catch (error: any) {
      console.error('Error creating subscription:', error)
      throw new Error(error.message || 'Error al crear la suscripción')
    }
  }

  return {
    subscription,
    isLoading,
    handleSubscriptionPortal,
    handleCancelSubscription,
    handleCreateSubscription,
  }
} 