import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Kambing = {
  id: number;
  nama: string;
  jenisKambing: string;
  berat: number;
  harga: number;
  user: string;
};

const jenisKambingOptions = [
  "Etawa",
  "Kacang",
  "Boer",
  "Jawarandu",
  "Peranakan Etawa",
];

export default function KambingManagement() {
  const [kambings, setKambings] = useState<Kambing[]>([
    {
      id: 1,
      nama: "Kambing A",
      jenisKambing: "Etawa",
      berat: 30,
      harga: 2000000,
      user: "Admin",
    },
    {
      id: 2,
      nama: "Kambing B",
      jenisKambing: "Kacang",
      berat: 25,
      harga: 1500000,
      user: "Peternak",
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentKambing, setCurrentKambing] = useState<Kambing | null>(null);

  const handleAddKambing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newKambing: Kambing = {
      id: kambings.length + 1,
      nama: formData.get("nama") as string,
      jenisKambing: formData.get("jenisKambing") as string,
      berat: Number(formData.get("berat")),
      harga: Number(formData.get("harga")),
      user: formData.get("user") as string,
    };
    setKambings([...kambings, newKambing]);
    setIsAddDialogOpen(false);
  };

  const handleEditKambing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedKambing: Kambing = {
      id: currentKambing!.id,
      nama: formData.get("nama") as string,
      jenisKambing: formData.get("jenisKambing") as string,
      berat: Number(formData.get("berat")),
      harga: Number(formData.get("harga")),
      user: formData.get("user") as string,
    };
    setKambings(
      kambings.map((k) => (k.id === updatedKambing.id ? updatedKambing : k))
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteKambing = () => {
    setKambings(kambings.filter((k) => k.id !== currentKambing!.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manajemen Kambing</h1>
      <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Tambah Kambing
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Jenis Kambing</TableHead>
            <TableHead>Berat (kg)</TableHead>
            <TableHead>Harga (Rp)</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kambings.map((kambing) => (
            <TableRow key={kambing.id}>
              <TableCell>{kambing.nama}</TableCell>
              <TableCell>{kambing.jenisKambing}</TableCell>
              <TableCell>{kambing.berat}</TableCell>
              <TableCell>{kambing.harga.toLocaleString("id-ID")}</TableCell>
              <TableCell>{kambing.user}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => {
                    setCurrentKambing(kambing);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentKambing(kambing);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kambing</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddKambing}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama" className="text-right">
                  Nama
                </Label>
                <Input id="nama" name="nama" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jenisKambing" className="text-right">
                  Jenis Kambing
                </Label>
                <Select
                  name="jenisKambing"
                  defaultValue={jenisKambingOptions[0]}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih jenis kambing" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisKambingOptions.map((jenis) => (
                      <SelectItem key={jenis} value={jenis}>
                        {jenis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="berat" className="text-right">
                  Berat (kg)
                </Label>
                <Input
                  id="berat"
                  name="berat"
                  type="number"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="harga" className="text-right">
                  Harga (Rp)
                </Label>
                <Input
                  id="harga"
                  name="harga"
                  type="number"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  User
                </Label>
                <Input id="user" name="user" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kambing</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditKambing}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama" className="text-right">
                  Nama
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  defaultValue={currentKambing?.nama}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jenisKambing" className="text-right">
                  Jenis Kambing
                </Label>
                <Select
                  name="jenisKambing"
                  defaultValue={currentKambing?.jenisKambing}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih jenis kambing" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisKambingOptions.map((jenis) => (
                      <SelectItem key={jenis} value={jenis}>
                        {jenis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="berat" className="text-right">
                  Berat (kg)
                </Label>
                <Input
                  id="berat"
                  name="berat"
                  type="number"
                  defaultValue={currentKambing?.berat}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="harga" className="text-right">
                  Harga (Rp)
                </Label>
                <Input
                  id="harga"
                  name="harga"
                  type="number"
                  defaultValue={currentKambing?.harga}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  User
                </Label>
                <Input
                  id="user"
                  name="user"
                  defaultValue={currentKambing?.user}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Kambing</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin menghapus kambing {currentKambing?.nama}?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteKambing}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
