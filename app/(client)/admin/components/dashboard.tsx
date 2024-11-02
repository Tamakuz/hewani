"use client";

import { useState } from "react";
import { User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserManagement from "./user-management";
import KambingManagement from "./KambingManagement";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("kambing");

  const handleLogout = () => {
    // Implementasi logout di sini
    console.log("Logout");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "user":
        return <UserManagement />;
      case "kambing":
      default:
        return <KambingManagement />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Admin Hidayah Farm</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant={activeTab === "kambing" ? "secondary" : "outline"}
              onClick={() => setActiveTab("kambing")}
            >
              <Home className="mr-2 h-4 w-4" />
              Kambing
            </Button>
            <Button
              variant={activeTab === "user" ? "secondary" : "outline"}
              onClick={() => setActiveTab("user")}
            >
              <User className="mr-2 h-4 w-4" />
              Pengguna
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
