"use client";
import React from "react";
import { CreditCard, User, Bell, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  comingSoon: boolean;
}

interface AccountMenuProps {
  menuItems: MenuItem[];
}

const AccountMenu: React.FC<AccountMenuProps> = ({ menuItems }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.comingSoon ? '#' : item.href}
          className={`relative group block p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 ${
            !item.comingSoon && 'hover:shadow-md'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          {item.comingSoon && (
            <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Próximamente
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default AccountMenu; 