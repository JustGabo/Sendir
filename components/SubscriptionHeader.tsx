"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const SubscriptionHeader: React.FC = () => {
  return (
    <div>
      <Link
        href='/account'
        className='inline-flex items-center text-sm text-gray-500 hover:text-gray-700'
      >
        <ChevronLeft className='h-4 w-4 mr-1' />
        Volver a Mi cuenta
      </Link>
      <h1 className='mt-4 text-2xl font-bold text-gray-900'>
        Suscripción
      </h1>
      <p className='mt-1 text-sm text-gray-500'>
        Gestiona tu suscripción a Sendir
      </p>
    </div>
  );
};

export default SubscriptionHeader; 