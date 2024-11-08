"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  weight: number;
  age: number;
  breed: string;
  gender: string;
  health_status: string;
  vaccination_status: boolean;
  categoryId: string;
  isAvailable: boolean;
};

type Category = {
  id: string;
  name: string;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Angora Goat",
    description: "A beautiful Angora goat",
    price: 500,
    stock: 5,
    image: "/placeholder.svg",
    weight: 45,
    age: 24,
    breed: "Angora",
    gender: "female",
    health_status: "Healthy",
    vaccination_status: true,
    categoryId: "1",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Boer Goat",
    description: "A strong Boer goat",
    price: 600,
    stock: 3,
    image: "/placeholder.svg",
    weight: 60,
    age: 36,
    breed: "Boer",
    gender: "male",
    health_status: "Healthy",
    vaccination_status: true,
    categoryId: "2",
    isAvailable: true,
  },
];

const mockCategories: Category[] = [
  { id: "1", name: "Dairy Goats" },
  { id: "2", name: "Meat Goats" },
];

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    weight: 0,
    age: 0,
    breed: "",
    gender: "",
    health_status: "",
    vaccination_status: false,
    categoryId: "",
    isAvailable: true,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProductInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "weight" ||
        name === "age"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleProductSelectChange = (name: string) => (value: string) => {
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSwitchChange = (name: string) => (checked: boolean) => {
    setNewProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setNewProduct((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const productToAdd: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, productToAdd]);
    setIsAddProductDialogOpen(false);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      weight: 0,
      age: 0,
      breed: "",
      gender: "",
      health_status: "",
      vaccination_status: false,
      categoryId: "",
      isAvailable: true,
    });
    setPreviewImage(null);
  };

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const requestSort = (key: keyof Product) => {
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
        <CardTitle>Product Management</CardTitle>
        <CardDescription>Manage your product inventory here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <Dialog
            open={isAddProductDialogOpen}
            onOpenChange={setIsAddProductDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={newProduct.price}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Button>
                      {previewImage && (
                        <div className="mt-2 relative w-full h-40">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={newProduct.weight}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="age" className="text-right">
                      Age (months)
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={newProduct.age}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="breed" className="text-right">
                      Breed
                    </Label>
                    <Input
                      id="breed"
                      name="breed"
                      value={newProduct.breed}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">
                      Gender
                    </Label>
                    <Select
                      onValueChange={handleProductSelectChange("gender")}
                      value={newProduct.gender}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="health_status" className="text-right">
                      Health Status
                    </Label>
                    <Input
                      id="health_status"
                      name="health_status"
                      value={newProduct.health_status}
                      onChange={handleProductInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vaccination_status" className="text-right">
                      Vaccination
                    </Label>
                    <Switch
                      id="vaccination_status"
                      checked={newProduct.vaccination_status}
                      onCheckedChange={handleProductSwitchChange(
                        "vaccination_status"
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="categoryId" className="text-right">
                      Category
                    </Label>
                    <Select
                      onValueChange={handleProductSelectChange("categoryId")}
                      value={newProduct.categoryId}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isAvailable" className="text-right">
                      Available
                    </Label>
                    <Switch
                      id="isAvailable"
                      checked={newProduct.isAvailable}
                      onCheckedChange={handleProductSwitchChange("isAvailable")}
                    />
                  </div>
                </div>
              </ScrollArea>
              <Button onClick={handleAddProduct} className="mt-4">
                Add Product
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
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
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("price")}
              >
                Price{" "}
                {sortConfig?.key === "price" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("stock")}
              >
                Stock{" "}
                {sortConfig?.key === "stock" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("isAvailable")}
              >
                Available{" "}
                {sortConfig?.key === "isAvailable" &&
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
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-16 h-16">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.isAvailable ? "Yes" : "No"}</TableCell>
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
