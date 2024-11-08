"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

type Category = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
};

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Dairy Goats",
    description: "Goats bred for milk production",
    isActive: true,
  },
  {
    id: "2",
    name: "Meat Goats",
    description: "Goats bred for meat production",
    isActive: true,
  },
];

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
    isActive: true,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Category;
    direction: "asc" | "desc";
  } | null>(null);

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySwitchChange = (checked: boolean) => {
    setNewCategory((prev) => ({ ...prev, isActive: checked }));
  };

  const handleAddCategory = () => {
    const categoryToAdd: Category = {
      ...newCategory,
      id: Date.now().toString(),
    };
    setCategories((prev) => [...prev, categoryToAdd]);
    setIsAddCategoryDialogOpen(false);
    setNewCategory({
      name: "",
      description: "",
      isActive: true,
    });
  };

  const sortedCategories = useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig !== null) {
      sortableCategories.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  const requestSort = (key: keyof Category) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
        <CardDescription>Manage your product categories here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <Dialog
            open={isAddCategoryDialogOpen}
            onOpenChange={setIsAddCategoryDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="categoryName"
                    name="name"
                    value={newCategory.name}
                    onChange={handleCategoryInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="categoryDescription"
                    name="description"
                    value={newCategory.description}
                    onChange={handleCategoryInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryIsActive" className="text-right">
                    Active
                  </Label>
                  <Switch
                    id="categoryIsActive"
                    checked={newCategory.isActive}
                    onCheckedChange={handleCategorySwitchChange}
                  />
                </div>
              </div>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name{" "}
                {sortConfig?.key === "name" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("isActive")}
              >
                Active{" "}
                {sortConfig?.key === "isActive" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.isActive ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
