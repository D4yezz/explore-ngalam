import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Eye, Pencil, Ticket, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputTemplate,
  TextareaTemplate,
} from "@/components/layout/input/input";

export default function TiketTable() {
  const [tiket, setTiket] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [editTiket, setEditTiket] = useState({
    id: null,
    nama_tarif: "",
    mulai: "",
    sampai: "",
    catatan_tambahan: "",
  });

  const getTiket = async () => {
    const { data, error } = await supabase
      .from("harga_tiket")
      .select("*")
      .order("nama_tarif", { ascending: false });
    if (error) {
      console.log(error);
      toast.error("Gagal memuat data Harga Tiket");
      return;
    }
    setTiket(data);
  };

  useEffect(() => {
    getTiket();
  }, []);

  const handleUpdateTiket = async (e) => {
    e.preventDefault();

    if (!editTiket.nama_tarif.trim()) {
      toast.error("Nama Tarif harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("harga_tiket")
        .update({
          nama_tarif: editTiket.nama_tarif,
          mulai: editTiket.mulai,
          sampai: editTiket.sampai,
          catatan_tambahan: editTiket.catatan_tambahan,
        })
        .eq("id", editTiket.id);

      if (error) {
        console.error("Update error:", error);
        toast.error("Gagal mengupdate Harga Tiket: " + error.message);
        return;
      }

      toast.success("Harga Tiket berhasil diupdate!");

      await getTiket();

      setIsEditDialogOpen(false);

      setEditTiket({
        id: null,
        nama_tarif: "",
        mulai: "",
        sampai: "",
        catatan_tambahan: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEditDialog = (item) => {
    setEditTiket({
      id: item.id,
      nama_tarif: item.nama_tarif,
      mulai: item.mulai,
      sampai: item.sampai,
      catatan_tambahan: item.catatan_tambahan,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("harga_tiket").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    getTiket();
  };


  return (
    <>
      <section className="w-full font-poppins min-h-screen py-12 px-4 pt-20 sm:px-6 lg:px-16">
        <div className="mx-auto">
          <div className="mb-8 w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Daftar Harga Tiket
            </h1>
            <p className="text-gray-600">
              Kelola data harga tiket dengan mudah
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500 hover:to-emerald-500">
                    <TableHead className="text-white font-semibold text-center w-16">
                      No
                    </TableHead>
                    <TableHead className="text-white font-semibold min-w-[140px]">
                      Nama Tarif
                    </TableHead>

                    <TableHead className="text-white font-semibold min-w-[100px]">
                      Mulai Dari
                    </TableHead>
                    <TableHead className="text-white font-semibold min-w-[100px]">
                      Sampai
                    </TableHead>
                    <TableHead className="text-white font-semibold min-w-[250px]">
                      Catatan Tambahan
                    </TableHead>
                    <TableHead className="text-white font-semibold text-center min-w-[180px]">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiket.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-green-50 transition-colors duration-150 border-b border-gray-100 h-16"
                    >
                      <TableCell className="font-medium text-center text-gray-700">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-semibold text-gray-800 pr-4">
                        {item.nama_tarif}
                      </TableCell>

                      <TableCell className="text-gray-600 text-sm pr-4 text-balance">
                        Rp.
                        {item.mulai.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 3,
                        }) || "-"}
                      </TableCell>

                      <TableCell className="text-gray-600 text-sm pr-4 text-balance">
                        Rp.
                        {item.sampai.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 3,
                        }) || "-"}
                      </TableCell>

                      <TableCell className="text-gray-600 text-sm pr-4 text-balance">
                        {item.catatan_tambahan || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 h-auto"
                                title="Detail"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="font-montserrat">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">
                                  {item.nama_tarif}
                                </DialogTitle>
                                <DialogDescription>
                                  {item.catatan_tambahan || "-"}
                                </DialogDescription>
                                <span className="flex items-center gap-2 mt-2 rounded-full text-white gradiasi-hijau w-fit px-4 py-1.5">
                                  <Ticket size={20} />
                                  Rp.
                                  {item.mulai.toLocaleString("id-ID", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 3,
                                  }) || "-"}
                                  - Rp.
                                  {item.sampai.toLocaleString("id-ID", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 3,
                                  }) || "-"}
                                </span>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          {/* Dialog Edit dengan State Control */}
                          <Dialog
                            open={isEditDialogOpen && editTiket.id === item.id}
                            onOpenChange={(open) => {
                              if (!open) {
                                setIsEditDialogOpen(false);
                                setEditTiket({
                                  id: null,
                                  nama_tarif: "",
                                  mulai: "",
                                  sampai: "",
                                  catatan_tambahan: "",
                                });
                              }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 h-auto"
                                title="Edit"
                                onClick={() => handleOpenEditDialog(item)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="font-montserrat">
                              <DialogHeader>
                                <DialogTitle className="text-2xl gradiasi-hijau text-transparent bg-clip-text">
                                  Edit Harga Tiket {item.nama_tarif}
                                </DialogTitle>

                                <form
                                  onSubmit={handleUpdateTiket}
                                  className="flex flex-col gap-2 mt-4"
                                >
                                  <InputTemplate
                                    label="Nama Tarif"
                                    id="nama-tarif"
                                    type="text"
                                    placeholder="Tarif Tiket"
                                    value={editTiket.nama_tarif}
                                    onChange={(e) =>
                                      setEditTiket({
                                        ...editTiket,
                                        nama_tarif: e.target.value,
                                      })
                                    }
                                    required
                                  />

                                  <InputTemplate
                                    label="Harga Mulai"
                                    id="mulai"
                                    type="number"
                                    placeholder="Mulai dari"
                                    value={editTiket.mulai}
                                    onChange={(e) =>
                                      setEditTiket({
                                        ...editTiket,
                                        mulai: e.target.value,
                                      })
                                    }
                                    required
                                  />

                                  <InputTemplate
                                    label="harga Akhir"
                                    id="sampai"
                                    type="number"
                                    placeholder="kapasitas"
                                    value={editTiket.sampai}
                                    onChange={(e) =>
                                      setEditTiket({
                                        ...editTiket,
                                        sampai: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                  <TextareaTemplate
                                    label="Catatan Tambahan"
                                    id="catatan"
                                    placeholder="Catatan Tambahan"
                                    value={editTiket.catatan_tambahan}
                                    onChange={(e) =>
                                      setEditTiket({
                                        ...editTiket,
                                        catatan_tambahan: e.target.value,
                                      })
                                    }
                                  />

                                  <div className="flex justify-end mt-4">
                                    <Button
                                      className="px-4 py-2 bg-green-500 hover:bg-green-600"
                                      type="submit"
                                      disabled={isLoading}
                                    >
                                      {isLoading ? "Menyimpan..." : "Simpan"}
                                    </Button>
                                  </div>
                                </form>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="px-3 py-2 h-auto"
                            title="Hapus"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Menampilkan{" "}
                <span className="font-semibold">{tiket.length}</span> fasilitas
                wisata
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
