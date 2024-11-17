"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import EditProductDialog from "./editProduct";

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

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
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
    isAvailable: true,
    categoryId: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Gagal mengambil produk");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error mengambil produk:", error);
      toast.error("Gagal mengambil produk");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Gagal mengambil kategori");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error mengambil kategori:", error);
      toast.error("Gagal mengambil kategori");
    }
  };

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
          name: productForm.name,
          description: productForm.description,
          price: Number(productForm.price),
          stock: Number(productForm.stock),
          image: productForm.image,
          weight: Number(productForm.weight),
          age: Number(productForm.age),
          breed: productForm.breed,
          gender: productForm.gender,
          health_status: productForm.health_status,
          vaccination_status: productForm.vaccination_status,
          categoryId: productForm.categoryId,
          isAvailable: productForm.isAvailable,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Produk berhasil ditambahkan!");
        fetchProducts(); // Refresh products list
        // Reset form
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
          isAvailable: true,
          categoryId: "",
        });
      } else {
        throw new Error(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      console.error("Error menambahkan produk:", error);
      toast.error(error instanceof Error ? error.message : "Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteProductClick = async (id: string) => {
    try {
      setDeletingProductId(id);
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus produk");
      }
      
      if (data.success) {
        toast.success("Produk berhasil dihapus");
        setProducts(products.filter(product => product.id !== id));
      } else {
        throw new Error(data.message || "Gagal menghapus produk");
      }
    } catch (error) {
      console.error("Error menghapus produk:", error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus produk");
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <TabsContent value="products">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Produk */}
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-2xl font-bold">Tambah Produk Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProductSubmit}>
              <ScrollArea className="h-[70vh] pr-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Produk</Label>
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
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Harga (Rp)</Label>
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
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stok</Label>
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
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Gambar</Label>
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
                      <Upload className="mr-2 h-4 w-4" /> Unggah Gambar
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
                      <Label htmlFor="weight">Berat (kg)</Label>
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
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Umur (bulan)</Label>
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
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="breed">Ras</Label>
                    <Input
                      id="breed"
                      value={productForm.breed}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          breed: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Select
                      value={productForm.gender}
                      onValueChange={(value) =>
                        setProductForm((prev) => ({
                          ...prev,
                          gender: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Jantan</SelectItem>
                        <SelectItem value="female">Betina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="health_status">Status Kesehatan</Label>
                    <Input
                      id="health_status"
                      value={productForm.health_status}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          health_status: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
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
                    <Label htmlFor="vaccination_status">Status Vaksinasi</Label>
                  </div>

                  <div className="flex items-center space-x-2">
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
                    <Label htmlFor="isAvailable">Tersedia</Label>
                  </div>

                  <div>
                    <Label htmlFor="categoryId">Kategori</Label>
                    <Select
                      value={productForm.categoryId}
                      onValueChange={(value) =>
                        setProductForm((prev) => ({
                          ...prev,
                          categoryId: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Menambahkan..." : "Tambah Produk"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tabel Produk */}
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-2xl font-bold">Daftar Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[70vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gambar</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Aksi</TableHead>
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
                      <TableCell>Rp {product.price.toLocaleString()}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="flex items-center justify-center gap-2 h-full">
                        <EditProductDialog product={product} categories={categories} onProductUpdated={fetchProducts} />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteProductClick(product.id)}
                          disabled={deletingProductId === product.id}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          {deletingProductId === product.id ? (
                            <div className="animate-spin">
                              <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            </div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
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
  );
}

export default AddProduct;
