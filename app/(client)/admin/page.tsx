"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProduct from "./addProduct";
import AddCategories from "./addCategories";

export default function AdminDashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <AddProduct />

            <AddCategories />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
