"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

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

interface EditProductProps {
  product: Product;
  categories: any[];
  onProductUpdated: () => void;
}

export default function EditProduct({ product, categories, onProductUpdated }: EditProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Product>(product);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields based on schema
      if (!formData.name || !formData.price || formData.price <= 0) {
        throw new Error("Nama produk dan harga harus diisi dengan benar");
      }

      // Validate weight (precision 5, scale 2 - max 999.99)
      if (formData.weight && formData.weight >= 1000) {
        throw new Error("Berat tidak boleh lebih dari 999.99 kg");
      }

      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Ensure all fields match schema types
          name: formData.name.slice(0, 255),
          description: formData.description || null,
          price: Number(formData.price),
          stock: Number(formData.stock),
          weight: formData.weight ? Number(formData.weight) : null,
          age: formData.age ? Number(formData.age) : null,
          breed: formData.breed?.slice(0, 100) || null,
          gender: formData.gender?.slice(0, 10) || null,
          health_status: formData.health_status?.slice(0, 50) || null,
          vaccination_status: Boolean(formData.vaccination_status),
          categoryId: formData.categoryId || null,
          isAvailable: Boolean(formData.isAvailable)
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Produk berhasil diperbarui!");
        onProductUpdated();
        setOpen(false);
      } else {
        throw new Error(data.message || "Gagal memperbarui produk");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui produk");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-yellow-500 hover:bg-yellow-600">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Produk *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  maxLength={255}
                />
              </div>

              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stok *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Gambar</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Berat</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Umur (bulan)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="breed">Ras</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jantan">Jantan</SelectItem>
                    <SelectItem value="Betina">Betina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="health_status">Status Kesehatan</Label>
                <Input
                  id="health_status"
                  value={formData.health_status}
                  onChange={(e) => setFormData(prev => ({ ...prev, health_status: e.target.value }))}
                  maxLength={50}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="vaccination_status"
                  checked={formData.vaccination_status}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, vaccination_status: checked }))}
                />
                <Label htmlFor="vaccination_status">Status Vaksinasi</Label>
              </div>

              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAvailable: checked }))}
                />
                <Label htmlFor="isAvailable">Tersedia</Label>
              </div>
            </div>
          </ScrollArea>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memperbarui..." : "Perbarui Produk"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
