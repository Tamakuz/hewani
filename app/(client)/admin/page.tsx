"use client";
import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  PenSquare,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Package,
  Tags,
  BarChart3,
  Users,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AddCategory from "./AddCategory";

// Dummy data
const dummyProducts = [
  {
    id: "1",
    name: "Kambing Boer Premium",
    description: "Kambing Boer kualitas terbaik",
    price: 8500000,
    stock: 3,
    image: "/api/placeholder/300/200",
    weight: 45.5,
    age: 12,
    breed: "Boer",
    gender: "Male",
    health_status: "Healthy",
    vaccination_status: true,
    categoryId: "1",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Kambing Etawa Unggul",
    description: "Kambing Etawa berkualitas",
    price: 6500000,
    stock: 5,
    image: "/api/placeholder/300/200",
    weight: 40.2,
    age: 10,
    breed: "Etawa",
    gender: "Female",
    health_status: "Healthy",
    vaccination_status: true,
    categoryId: "2",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Kambing Kacang",
    description: "Kambing lokal berkualitas",
    price: 4500000,
    stock: 8,
    image: "/api/placeholder/300/200",
    weight: 35.0,
    age: 8,
    breed: "Kacang",
    gender: "Male",
    health_status: "Healthy",
    vaccination_status: false,
    categoryId: "3",
    isAvailable: true,
  },
];

const dummyCategories = [
  {
    id: "1",
    name: "Premium",
    description: "Kambing kualitas premium",
    isActive: true,
    productCount: 12,
  },
  {
    id: "2",
    name: "Standard",
    description: "Kambing kualitas standar",
    isActive: true,
    productCount: 18,
  },
  {
    id: "3",
    name: "Economic",
    description: "Kambing kualitas ekonomis",
    isActive: false,
    productCount: 8,
  },
];

const ModernDashboard = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [categories, setCategories] = useState(dummyCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: "product" | "category";
  } | null>(null);

  // Stats cards data
  const stats = [
    {
      title: "Total Produk",
      value: products.length,
      icon: Package,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Kategori",
      value: categories.length,
      icon: Tags,
      trend: "0%",
      trendUp: true,
    },
  ];

  const handleDelete = (id: string, type: "product" | "category") => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "product") {
      setProducts(products.filter((p) => p.id !== itemToDelete.id));
      toast({
        title: "Berhasil",
        description: "Produk telah dihapus",
      });
    } else {
      setCategories(categories.filter((c) => c.id !== itemToDelete.id));
      toast({
        title: "Berhasil",
        description: "Kategori telah dihapus",
      });
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p
                  className={`text-sm mt-2 flex items-center ${
                    stat.trendUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend}
                  <span className="text-xs ml-1">vs last month</span>
                </p>
              </div>
              <div className={`p-4 rounded-full bg-emerald-50`}>
                <stat.icon className="w-6 h-6 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Dashboard Admin Peternakan</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="products">Produk</TabsTrigger>
              <TabsTrigger value="categories">Kategori</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                   <button>tambah product</button>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari produk..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-[300px]"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="rounded-lg border shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[100px]">Gambar</TableHead>
                        <TableHead>Info Produk</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Harga
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow
                          key={product.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {product.description}
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="secondary">
                                  {product.breed}
                                </Badge>
                                <Badge variant="secondary">
                                  {product.weight} kg
                                </Badge>
                                <Badge variant="secondary">
                                  {product.age} bulan
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            Rp {product.price.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.stock > 0 ? "success" : "destructive"
                              }
                            >
                              {product.stock} unit
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge
                                variant={
                                  product.isAvailable
                                    ? "success"
                                    : "destructive"
                                }
                              >
                                {product.isAvailable
                                  ? "Tersedia"
                                  : "Tidak Tersedia"}
                              </Badge>
                              <br />
                              <Badge
                                variant={
                                  product.vaccination_status
                                    ? "success"
                                    : "destructive"
                                }
                              >
                                {product.vaccination_status
                                  ? "Sudah Vaksin"
                                  : "Belum Vaksin"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <PenSquare className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDelete(product.id, "product")
                                  }
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <AddCategory
                    onSuccess={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {category.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {category.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <PenSquare className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleDelete(category.id, "category")
                                }
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge
                            variant={
                              category.isActive ? "success" : "destructive"
                            }
                          >
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {category.productCount} products
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              {itemToDelete?.type === "product"
                ? "Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
                : "Apakah Anda yakin ingin menghapus kategori ini? Semua produk dalam kategori ini akan diatur ulang."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Modal */}
      <Dialog>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Tambah Produk Baru</DialogTitle>
          </DialogHeader>
          {/* Add Product Form Component will be rendered here */}
        </DialogContent>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
          </DialogHeader>
          {/* Add Category Form Component will be rendered here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModernDashboard;
