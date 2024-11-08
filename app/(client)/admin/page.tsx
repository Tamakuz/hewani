"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, List } from "lucide-react";
import ProductManagement from "./tabProduct";
import CategoryManagement from "./tabCategory";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");

  return (
<<<<<<< HEAD
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
=======
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
                    <AddProductForm />
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
                                product.stock > 0 ? "default" : "destructive"
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
                                    ? "default"
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
                                    ? "default"
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
                              category.isActive ? "default" : "destructive"
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
>>>>>>> 59013a0ffb6780154348acecf9471b3812d5bd88
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
