import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputTemplate,
  TextareaTemplate,
} from "@/components/layout/input/input";
import { toast } from "sonner";

export default function FasilitasTable() {
  const [fasilitas, setFasilitas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State untuk kontrol dialog

  const [editFasilitas, setEditFasilitas] = useState({
    id: null,
    nama: "",
    deskripsi: "",
    kategori_fasilitas: "",
    kapasitas: "",
  });

  const getFasilitas = async () => {
    const { data, error } = await supabase
      .from("fasilitas")
      .select("*")
      .order("nama", { ascending: false });
    if (error) {
      console.log(error);
      toast.error("Gagal memuat data fasilitas");
      return;
    }
    setFasilitas(data);
  };

  useEffect(() => {
    getFasilitas();
  }, []);

  const handleUpdateFasilitas = async (e) => {
    e.preventDefault();

    if (!editFasilitas.nama.trim()) {
      toast.error("Nama Fasilitas harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("fasilitas")
        .update({
          nama: editFasilitas.nama,
          deskripsi: editFasilitas.deskripsi,
          kategori_fasilitas: editFasilitas.kategori_fasilitas,
          kapasitas: editFasilitas.kapasitas,
        })
        .eq("id", editFasilitas.id);

      if (error) {
        console.error("Update error:", error);
        toast.error("Gagal mengupdate fasilitas: " + error.message);
        return;
      }

      toast.success("Fasilitas berhasil diupdate!");
      
      await getFasilitas();
      
      setIsEditDialogOpen(false);
      
      setEditFasilitas({
        id: null,
        nama: "",
        deskripsi: "",
        kategori_fasilitas: "",
        kapasitas: "",
      });

    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenEditDialog = (item) => {
    setEditFasilitas({
      id: item.id,
      nama: item.nama,
      deskripsi: item.deskripsi,
      kategori_fasilitas: item.kategori_fasilitas,
      kapasitas: item.kapasitas,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("fasilitas").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    getFasilitas();
  };


  return (
    <section className="w-full font-poppins min-h-screen py-12 px-4 pt-20 sm:px-6 lg:px-16">
      <div className="mx-auto">
        <div className="mb-8 w-full flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Daftar Fasilitas Wisata
          </h1>
          <p className="text-gray-600">
            Kelola data fasilitas wisata dengan mudah
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
                    Nama Fasilitas
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[250px]">
                    Deskripsi
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[100px]">
                    Kapasitas
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[100px]">
                    Kategori
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center min-w-[180px]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fasilitas.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-green-50 transition-colors duration-150 border-b border-gray-100 h-16"
                  >
                    <TableCell className="font-medium text-center text-gray-700">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800 pr-4">
                      {item.nama}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm pr-4 text-balance">
                      {item.deskripsi || "-"}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm pr-4 text-balance">
                      {item.kapasitas || "-"}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.kategori_fasilitas || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        {/* Dialog Detail */}
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
                                {item.nama}
                              </DialogTitle>
                              <DialogDescription>
                                {item.deskripsi}
                              </DialogDescription>
                              <p className="font-semibold">
                                Kapasitas: {item.kapasitas}
                              </p>
                              <span className="flex items-center px-4 py-1 rounded-full gradiasi-hijau w-fit text-white font-semibold mx-auto lg:mx-0">
                                {item.kategori_fasilitas}
                              </span>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                        {/* Dialog Edit dengan State Control */}
                        <Dialog 
                          open={isEditDialogOpen && editFasilitas.id === item.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setIsEditDialogOpen(false);
                              setEditFasilitas({
                                id: null,
                                nama: "",
                                deskripsi: "",
                                kategori_fasilitas: "",
                                kapasitas: "",
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
                                Edit Fasilitas {item.nama}
                              </DialogTitle>

                              <form
                                onSubmit={handleUpdateFasilitas}
                                className="flex flex-col gap-2 mt-4"
                              >
                                <InputTemplate
                                  label="Nama Fasilitas"
                                  id="nama-fasilitas"
                                  type="text"
                                  placeholder="nama fasilitas"
                                  value={editFasilitas.nama}
                                  onChange={(e) =>
                                    setEditFasilitas({
                                      ...editFasilitas,
                                      nama: e.target.value,
                                    })
                                  }
                                  required
                                />

                                <TextareaTemplate
                                  label="Deskripsi"
                                  id="deskripsi-fasilitas"
                                  placeholder="Deksripsikan fasilitas wisata (maksimal 100 huruf)"
                                  value={editFasilitas.deskripsi}
                                  onChange={(e) =>
                                    setEditFasilitas({
                                      ...editFasilitas,
                                      deskripsi: e.target.value,
                                    })
                                  }
                                />

                                <InputTemplate
                                  label="Kategori Fasilitas"
                                  id="kategori-fasilitas"
                                  type="text"
                                  placeholder="kategori"
                                  value={editFasilitas.kategori_fasilitas}
                                  onChange={(e) =>
                                    setEditFasilitas({
                                      ...editFasilitas,
                                      kategori_fasilitas: e.target.value,
                                    })
                                  }
                                  required
                                />

                                <InputTemplate
                                  label="Kapasitas Fasilitas"
                                  id="kapasitas-fasilitas"
                                  type="number"
                                  placeholder="kapasitas"
                                  value={editFasilitas.kapasitas}
                                  onChange={(e) =>
                                    setEditFasilitas({
                                      ...editFasilitas,
                                      kapasitas: e.target.value,
                                    })
                                  }
                                  required
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
              <span className="font-semibold">{fasilitas.length}</span>{" "}
              fasilitas wisata
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}