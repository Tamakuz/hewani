// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Upload, Pencil, Trash2 } from "lucide-react";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   image: string;
//   weight: number;
//   age: number;
//   breed: string;
//   gender: string;
//   health_status: string;
//   vaccination_status: boolean;
//   categoryId: string;
//   isAvailable: boolean;
// }

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   isActive: boolean;
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("products");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Data states
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Product form state
//   const [productForm, setProductForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     image: "",
//     weight: "",
//     age: "",
//     breed: "",
//     gender: "",
//     health_status: "",
//     vaccination_status: false,
//     categoryId: "",
//     isAvailable: true,
//   });

//   // Category form state
//   const [categoryForm, setCategoryForm] = useState({
//     name: "",
//     description: "",
//     isActive: true,
//   });

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("/api/products");
//       if (response.ok) {
//         const data = await response.json();
//         setProducts(data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("/api/categories");
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Handle product form submission
//   const handleProductSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...productForm,
//           price: parseFloat(productForm.price),
//           stock: parseInt(productForm.stock),
//           age: parseInt(productForm.age),
//           weight: parseFloat(productForm.weight),
//         }),
//       });

//       if (response.ok) {
//         alert("Product added successfully!");
//         // Reset form
//         setProductForm({
//           name: "",
//           description: "",
//           price: "",
//           stock: "",
//           image: "",
//           weight: "",
//           age: "",
//           breed: "",
//           gender: "",
//           health_status: "",
//           vaccination_status: false,
//           categoryId: "",
//           isAvailable: true,
//         });
//       } else {
//         alert("Failed to add product");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Error adding product");
//     }
//   };

//   // Handle category form submission
//   const handleCategorySubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("/api/categories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(categoryForm),
//       });

//       if (response.ok) {
//         alert("Category added successfully!");
//         // Reset form
//         setCategoryForm({
//           name: "",
//           description: "",
//           isActive: true,
//         });
//         // Refresh categories list
//         fetchCategories();
//       } else {
//         alert("Failed to add category");
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//       alert("Error adding category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setProductForm((prev) => ({ ...prev, image: base64String }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <Card className="max-w-7xl mx-auto">
//         <CardHeader>
//           <CardTitle>Admin Dashboard</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="mb-4">
//               <TabsTrigger value="products">Products</TabsTrigger>
//               <TabsTrigger value="categories">Categories</TabsTrigger>
//             </TabsList>

//             <TabsContent value="products">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Product Form */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Add New Product</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleProductSubmit}>
//                       <ScrollArea className="h-[70vh] pr-4">
//                         <div className="space-y-4">
//                           <div>
//                             <Label htmlFor="name">Name</Label>
//                             <Input
//                               id="name"
//                               value={productForm.name}
//                               onChange={(e) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   name: e.target.value,
//                                 }))
//                               }
//                               required
//                             />
//                           </div>

//                           <div>
//                             <Label htmlFor="description">Description</Label>
//                             <Textarea
//                               id="description"
//                               value={productForm.description}
//                               onChange={(e) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   description: e.target.value,
//                                 }))
//                               }
//                             />
//                           </div>

//                           <div className="grid grid-cols-2 gap-4">
//                             <div>
//                               <Label htmlFor="price">Price</Label>
//                               <Input
//                                 id="price"
//                                 type="number"
//                                 value={productForm.price}
//                                 onChange={(e) =>
//                                   setProductForm((prev) => ({
//                                     ...prev,
//                                     price: e.target.value,
//                                   }))
//                                 }
//                                 required
//                               />
//                             </div>
//                             <div>
//                               <Label htmlFor="stock">Stock</Label>
//                               <Input
//                                 id="stock"
//                                 type="number"
//                                 value={productForm.stock}
//                                 onChange={(e) =>
//                                   setProductForm((prev) => ({
//                                     ...prev,
//                                     stock: e.target.value,
//                                   }))
//                                 }
//                                 required
//                               />
//                             </div>
//                           </div>

//                           <div>
//                             <Label htmlFor="image">Image</Label>
//                             <input
//                               type="file"
//                               accept="image/*"
//                               onChange={handleImageUpload}
//                               ref={fileInputRef}
//                               className="hidden"
//                             />
//                             <Button
//                               type="button"
//                               variant="outline"
//                               onClick={() => fileInputRef.current?.click()}
//                               className="w-full"
//                             >
//                               <Upload className="mr-2 h-4 w-4" /> Upload Image
//                             </Button>
//                           </div>

//                           {productForm.image && (
//                             <div className="relative w-full h-40">
//                               <img
//                                 src={productForm.image}
//                                 alt="Preview"
//                                 className="w-full h-full object-cover rounded-md"
//                               />
//                             </div>
//                           )}

//                           <div className="grid grid-cols-2 gap-4">
//                             <div>
//                               <Label htmlFor="weight">Weight (kg)</Label>
//                               <Input
//                                 id="weight"
//                                 type="number"
//                                 value={productForm.weight}
//                                 onChange={(e) =>
//                                   setProductForm((prev) => ({
//                                     ...prev,
//                                     weight: e.target.value,
//                                   }))
//                                 }
//                               />
//                             </div>
//                             <div>
//                               <Label htmlFor="age">Age (months)</Label>
//                               <Input
//                                 id="age"
//                                 type="number"
//                                 value={productForm.age}
//                                 onChange={(e) =>
//                                   setProductForm((prev) => ({
//                                     ...prev,
//                                     age: e.target.value,
//                                   }))
//                                 }
//                               />
//                             </div>
//                           </div>

//                           <div>
//                             <Label htmlFor="breed">Breed</Label>
//                             <Input
//                               id="breed"
//                               value={productForm.breed}
//                               onChange={(e) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   breed: e.target.value,
//                                 }))
//                               }
//                             />
//                           </div>

//                           <div>
//                             <Label htmlFor="gender">Gender</Label>
//                             <Select
//                               value={productForm.gender}
//                               onValueChange={(value) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   gender: value,
//                                 }))
//                               }
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select gender" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="male">Male</SelectItem>
//                                 <SelectItem value="female">Female</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div>
//                             <Label htmlFor="health_status">Health Status</Label>
//                             <Input
//                               id="health_status"
//                               value={productForm.health_status}
//                               onChange={(e) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   health_status: e.target.value,
//                                 }))
//                               }
//                             />
//                           </div>

//                           <div className="flex items-center space-x-2">
//                             <Label htmlFor="vaccination_status">
//                               Vaccination Status
//                             </Label>
//                             <Switch
//                               id="vaccination_status"
//                               checked={productForm.vaccination_status}
//                               onCheckedChange={(checked) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   vaccination_status: checked,
//                                 }))
//                               }
//                             />
//                           </div>

//                           <div className="flex items-center space-x-2">
//                             <Label htmlFor="isAvailable">Available</Label>
//                             <Switch
//                               id="isAvailable"
//                               checked={productForm.isAvailable}
//                               onCheckedChange={(checked) =>
//                                 setProductForm((prev) => ({
//                                   ...prev,
//                                   isAvailable: checked,
//                                 }))
//                               }
//                             />
//                           </div>
//                         </div>
//                       </ScrollArea>
//                       <div className="mt-4">
//                         <Button
//                           type="submit"
//                           className="w-full"
//                           disabled={loading}
//                         >
//                           {loading ? "Adding..." : "Add Product"}
//                         </Button>
//                       </div>
//                     </form>
//                   </CardContent>
//                 </Card>

//                 {/* Products Table */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Product List</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[70vh]">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Image</TableHead>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Price</TableHead>
//                             <TableHead>Stock</TableHead>
//                             <TableHead>Actions</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {products.map((product) => (
//                             <TableRow key={product.id}>
//                               <TableCell>
//                                 <img
//                                   src={product.image}
//                                   alt={product.name}
//                                   className="w-16 h-16 object-cover rounded-md"
//                                 />
//                               </TableCell>
//                               <TableCell>{product.name}</TableCell>
//                               <TableCell>${product.price}</TableCell>
//                               <TableCell>{product.stock}</TableCell>
//                               <TableCell>
//                                 <div className="flex space-x-2">
//                                   <Button variant="outline" size="icon">
//                                     <Pencil className="h-4 w-4" />
//                                   </Button>
//                                   <Button variant="destructive" size="icon">
//                                     <Trash2 className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </ScrollArea>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="categories">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Category Form */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Add New Category</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleCategorySubmit}>
//                       <div className="space-y-4">
//                         <div>
//                           <Label htmlFor="categoryName">Name</Label>
//                           <Input
//                             id="categoryName"
//                             value={categoryForm.name}
//                             onChange={(e) =>
//                               setCategoryForm((prev) => ({
//                                 ...prev,
//                                 name: e.target.value,
//                               }))
//                             }
//                             required
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="categoryDescription">
//                             Description
//                           </Label>
//                           <Textarea
//                             id="categoryDescription"
//                             value={categoryForm.description}
//                             onChange={(e) =>
//                               setCategoryForm((prev) => ({
//                                 ...prev,
//                                 description: e.target.value,
//                               }))
//                             }
//                           />
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <Label htmlFor="categoryIsActive">Active</Label>
//                           <Switch
//                             id="categoryIsActive"
//                             checked={categoryForm.isActive}
//                             onCheckedChange={(checked) =>
//                               setCategoryForm((prev) => ({
//                                 ...prev,
//                                 isActive: checked,
//                               }))
//                             }
//                           />
//                         </div>
//                         <Button
//                           type="submit"
//                           className="w-full"
//                           disabled={loading}
//                         >
//                           {loading ? "Adding..." : "Add Category"}
//                         </Button>
//                       </div>
//                     </form>
//                   </CardContent>
//                 </Card>

//                 {/* Categories Table */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Category List</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[70vh]">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Description</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Actions</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {categories.map((category) => (
//                             <TableRow key={category.id}>
//                               <TableCell className="font-medium">
//                                 {category.name}
//                               </TableCell>
//                               <TableCell>{category.description}</TableCell>
//                               <TableCell>
//                                 <span
//                                   className={`px-2 py-1 rounded-full text-xs ${
//                                     category.isActive
//                                       ? "bg-green-100 text-green-800"
//                                       : "bg-red-100 text-red-800"
//                                   }`}
//                                 >
//                                   {category.isActive ? "Active" : "Inactive"}
//                                 </span>
//                               </TableCell>
//                               <TableCell>
//                                 <div className="flex space-x-2">
//                                   <Button variant="outline" size="icon">
//                                     <Pencil className="h-4 w-4" />
//                                   </Button>
//                                   <Button
//                                     variant="destructive"
//                                     size="icon"
//                                     onClick={() =>
//                                       handleDeleteCategory(category.id)
//                                     }
//                                   >
//                                     <Trash2 className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </ScrollArea>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );

//   // Delete handlers
//   const handleDeleteProduct = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Product deleted successfully!");
//         // Refresh products list
//         fetchProducts();
//       } else {
//         alert("Failed to delete product");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Error deleting product");
//     }
//   };

//   const handleDeleteCategory = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this category?")) return;

//     try {
//       const response = await fetch(`/api/categories/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Category deleted successfully!");
//         // Refresh categories list
//         fetchCategories();
//       } else {
//         alert("Failed to delete category");
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       alert("Error deleting category");
//     }
//   };
// }
// page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import EditCategoryDialog from "./editc";
// import EditProductDialog from "./edit";
import { deleteProduct, deleteCategory } from "./detelte";
import EditProductDialog from "./edit";

interface Product {
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
}

interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function AdminDashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState("products");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form states
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    weight: "",
    age: "",
    breed: "",
    gender: "",
    health_status: "",
    vaccination_status: false,
    categoryId: "",
    isAvailable: true,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch functions
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  // Handle form submissions
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          stock: parseInt(productForm.stock),
          age: parseInt(productForm.age),
          weight: parseFloat(productForm.weight),
        }),
      });

      if (!response.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully!");
      setProductForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        weight: "",
        age: "",
        breed: "",
        gender: "",
        health_status: "",
        vaccination_status: false,
        categoryId: "",
        isAvailable: true,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryForm),
      });

      if (!response.ok) throw new Error("Failed to add category");

      toast.success("Category added successfully!");
      setCategoryForm({
        name: "",
        description: "",
        isActive: true,
      });
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProductForm((prev) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit handlers
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  // Delete handlers
  const handleDeleteProductClick = async (id: string) => {
    const success = await deleteProduct(id);
    if (success) {
      fetchProducts();
    }
  };

  const handleDeleteCategoryClick = async (id: string) => {
    const success = await deleteCategory(id);
    if (success) {
      fetchCategories();
    }
  };

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

            <TabsContent value="products">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProductSubmit}>
                      <ScrollArea className="h-[70vh] pr-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={productForm.name}
                              onChange={(e) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={productForm.description}
                              onChange={(e) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="price">Price</Label>
                              <Input
                                id="price"
                                type="number"
                                value={productForm.price}
                                onChange={(e) =>
                                  setProductForm((prev) => ({
                                    ...prev,
                                    price: e.target.value,
                                  }))
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="stock">Stock</Label>
                              <Input
                                id="stock"
                                type="number"
                                value={productForm.stock}
                                onChange={(e) =>
                                  setProductForm((prev) => ({
                                    ...prev,
                                    stock: e.target.value,
                                  }))
                                }
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="image">Image</Label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              ref={fileInputRef}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full"
                            >
                              <Upload className="mr-2 h-4 w-4" /> Upload Image
                            </Button>
                          </div>

                          {productForm.image && (
                            <div className="relative w-full h-40">
                              <img
                                src={productForm.image}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="weight">Weight (kg)</Label>
                              <Input
                                id="weight"
                                type="number"
                                value={productForm.weight}
                                onChange={(e) =>
                                  setProductForm((prev) => ({
                                    ...prev,
                                    weight: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="age">Age (months)</Label>
                              <Input
                                id="age"
                                type="number"
                                value={productForm.age}
                                onChange={(e) =>
                                  setProductForm((prev) => ({
                                    ...prev,
                                    age: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="breed">Breed</Label>
                            <Input
                              id="breed"
                              value={productForm.breed}
                              onChange={(e) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  breed: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                              value={productForm.gender}
                              onValueChange={(value) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  gender: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="health_status">Health Status</Label>
                            <Input
                              id="health_status"
                              value={productForm.health_status}
                              onChange={(e) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  health_status: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Label htmlFor="vaccination_status">
                              Vaccination Status
                            </Label>
                            <Switch
                              id="vaccination_status"
                              checked={productForm.vaccination_status}
                              onCheckedChange={(checked) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  vaccination_status: checked,
                                }))
                              }
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Label htmlFor="isAvailable">Available</Label>
                            <Switch
                              id="isAvailable"
                              checked={productForm.isAvailable}
                              onCheckedChange={(checked) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  isAvailable: checked,
                                }))
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor="categoryId">Category</Label>
                            <Select
                              value={productForm.categoryId}
                              onValueChange={(value) =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  categoryId: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </ScrollArea>
                      <div className="mt-4">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={loading}
                        >
                          {loading ? "Adding..." : "Add Product"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Products Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[70vh]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              </TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>${product.price}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {/* <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEditProduct(product)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button> */}
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      handleDeleteProductClick(product.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCategorySubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="categoryName">Name</Label>
                          <Input
                            id="categoryName"
                            value={categoryForm.name}
                            onChange={(e) =>
                              setCategoryForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="categoryDescription">
                            Description
                          </Label>
                          <Textarea
                            id="categoryDescription"
                            value={categoryForm.description}
                            onChange={(e) =>
                              setCategoryForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Label htmlFor="categoryIsActive">Active</Label>
                          <Switch
                            id="categoryIsActive"
                            checked={categoryForm.isActive}
                            onCheckedChange={(checked) =>
                              setCategoryForm((prev) => ({
                                ...prev,
                                isActive: checked,
                              }))
                            }
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={loading}
                        >
                          {loading ? "Adding..." : "Add Category"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Categories Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Category List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[70vh]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {categories.map((category) => (
                            <TableRow key={category.id}>
                              <TableCell className="font-medium">
                                {category.name}
                              </TableCell>
                              <TableCell>{category.description}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    category.isActive
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {category.isActive ? "Active" : "Inactive"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEditCategory(category)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      handleDeleteCategoryClick(category.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Dialogs */}
      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onSave={fetchProducts}
        />
      )}

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          onSave={fetchCategories}
        />
      )}
    </div>
  );
}
