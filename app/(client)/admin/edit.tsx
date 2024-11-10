// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

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

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export default function EditProductDialog({
  product,
  open,
  onOpenChange,
  onSave,
}: EditProductDialogProps) {
  const [editForm, setEditForm] = useState<Product>(product);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      toast.success("Product updated successfully");
      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditForm((prev) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value),
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editForm.stock}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        stock: parseInt(e.target.value),
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-image">Image</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="edit-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("edit-image")?.click()
                    }
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Change Image
                  </Button>
                </div>
                {editForm.image && (
                  <div className="mt-2 relative w-full h-40">
                    <img
                      src={editForm.image}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-weight">Weight (kg)</Label>
                  <Input
                    id="edit-weight"
                    type="number"
                    value={editForm.weight}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        weight: parseFloat(e.target.value),
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-age">Age (months)</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={editForm.age}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        age: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-breed">Breed</Label>
                <Input
                  id="edit-breed"
                  value={editForm.breed}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, breed: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-gender">Gender</Label>
                <Select
                  value={editForm.gender}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger id="edit-gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-health-status">Health Status</Label>
                <Input
                  id="edit-health-status"
                  value={editForm.health_status}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      health_status: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="edit-vaccination-status">
                  Vaccination Status
                </Label>
                <Switch
                  id="edit-vaccination-status"
                  checked={editForm.vaccination_status}
                  onCheckedChange={(checked) =>
                    setEditForm((prev) => ({
                      ...prev,
                      vaccination_status: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="edit-available">Available</Label>
                <Switch
                  id="edit-available"
                  checked={editForm.isAvailable}
                  onCheckedChange={(checked) =>
                    setEditForm((prev) => ({ ...prev, isAvailable: checked }))
                  }
                />
              </div>
            </div>
          </ScrollArea>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
