"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, List } from "lucide-react";
import ProductManagement from "./tabProduct";
import CategoryManagement from "./tabCategory";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <nav>
            <button
              className={`flex items-center w-full p-2 rounded-lg ${
                activeTab === "products" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              <Package className="mr-2" />
              Products
            </button>
            <button
              className={`flex items-center w-full p-2 rounded-lg ${
                activeTab === "categories" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("categories")}
            >
              <List className="mr-2" />
              Categories
            </button>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          <TabsContent value="categories">
            <CategoryManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
