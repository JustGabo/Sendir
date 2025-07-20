"use client";
import React from "react";
import { User } from "lucide-react";

interface AccountHeaderProps {
  nombreCompleto: string;
  email: string;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ nombreCompleto, email }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-16 lg:h-16 lg:w-16 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-6 w-6 lg:h-8 lg:w-8 text-gray-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium line-clamp-1 text-gray-900">
            {nombreCompleto || 'Usuario'}
          </h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader; 