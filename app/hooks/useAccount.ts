"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscription } from "@/app/hooks/useSubscription";
import { CreditCard, User, Bell, Shield } from "lucide-react";

export const useAccount = () => {
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.id);
  
  const isSubscribed = subscription?.subscription_status === 'active';

  const menuItems = [
    {
      title: 'Información personal',
      description: 'Gestiona tu información personal y académica',
      icon: User,
      href: '/account/personal',
      comingSoon: false
    },
    {
      title: 'Suscripción',
      description: 'Gestiona tu plan y método de pago',
      icon: CreditCard,
      href: '/account/subscription',
      comingSoon: false
    },
    {
      title: 'Notificaciones',
      description: 'Configura tus preferencias de notificación',
      icon: Bell,
      href: '/account/notifications',
      comingSoon: true
    },
    {
      title: 'Privacidad y seguridad',
      description: 'Gestiona la seguridad de tu cuenta',
      icon: Shield,
      href: '/account/privacy',
      comingSoon: true
    }
  ];

  return {
    user,
    menuItems,
    isSubscribed,
    nombreCompleto: user?.user_metadata?.nombre_completo || 'Usuario',
    email: user?.email || '',
  };
}; 