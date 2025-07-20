"use client";
import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import { LogOut, Settings, User, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  name: string;
  greeting: string;
  matricula: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name, greeting, matricula }) => {
  const { logout, isLoggingOut } = useAuth();
  const router = useRouter();

  return (
    <header className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg tracking- font-medium text-[#A1A9AF]">
                {greeting}, <br />
                <span className="text-2xl font-semibold text-[#020608]">
                  {name}
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                {matricula}
              </p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="outline-none bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
                <Settings
                  strokeWidth={1.7}
                  className="text-neutral-800 h-5 w-5 hover:text-neutral-600 transition-colors"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-2">
              <button
                onClick={() => router.push("/account")}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs lg:text-sm text-black rounded-md transition-colors"
              >
                <User className="h-4 w-4" />
                Mi cuenta
              </button>
              <button
                onClick={logout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs lg:text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cerrando...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </>
                )}
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 