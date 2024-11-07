import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Upload, X, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddProductForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "0",
    weight: "",
    age: "",
    breed: "",
    gender: "",
    health_status: "",
    vaccination_status: false,
    categoryId: "",
    isAvailable: true,
    image: null as File | null,
  });

  // Sample categories data - replace with actual data from your API
  const categories = [
    { id: "1", name: "Kambing Premium" },
    { id: "2", name: "Kambing Regular" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Ukuran gambar tidak boleh lebih dari 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.image) {
        throw new Error("Nama, harga, dan gambar produk wajib diisi");
      }

      // Create FormData for image upload
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      // Add your API call here
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: formDataToSend
      // });

      // if (!response.ok) throw new Error('Gagal menambahkan produk');

      setOpen(false);
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "0",
        weight: "",
        age: "",
        breed: "",
        gender: "",
        health_status: "",
        vaccination_status: false,
        categoryId: "",
        isAvailable: true,
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Produk*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Masukkan nama produk"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Masukkan deskripsi produk"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Harga (Rp)*</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock">Stok</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Berat (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="age">Umur (bulan)</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="breed">Jenis/Ras</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                placeholder="Masukkan jenis/ras"
              />
            </div>

            <div>
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger>
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
              <Select
                value={formData.health_status}
                onValueChange={(value) =>
                  setFormData({ ...formData, health_status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status kesehatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Sehat</SelectItem>
                  <SelectItem value="sick">Sakit</SelectItem>
                  <SelectItem value="recovering">Pemulihan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categoryId">Kategori</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
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

            <div className="flex items-center justify-between">
              <Label htmlFor="vaccination_status">Status Vaksinasi</Label>
              <Switch
                id="vaccination_status"
                checked={formData.vaccination_status}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, vaccination_status: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isAvailable">Tersedia</Label>
              <Switch
                id="isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isAvailable: checked })
                }
              />
            </div>

            <div>
              <Label>Foto Produk*</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-full h-48">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-sm text-gray-500">
                      <Upload className="w-8 h-8 mb-2" />
                      <p>Klik untuk upload atau drag & drop</p>
                      <p>PNG, JPG (max. 5MB)</p>
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={imagePreview ? "hidden" : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="col-span-2 flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Produk"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
