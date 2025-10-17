import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TableWisata() {
  const [wisata, setWisata] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const navigasi = useNavigate();

  const getTotal = async () => {
    const { count } = await supabase
      .from("wisata")
      .select("*", { count: "exact", head: true });
    setTotal(count || 0);
  };

  const getWisata = async (currentPage = 1) => {
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("wisata")
      .select("*, harga_tiket(*)")
      .order("nama", { ascending: true })
      .range(from, to);

    if (error) console.log(error);
    else setWisata(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("wisata").delete().eq("id", id);
    if (!error) {
      getWisata(page);
      getTotal();
    }
  };

  useEffect(() => {
    getWisata(page);
    getTotal();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="w-full font-poppins min-h-screen py-12 px-4 pt-20 sm:px-6 lg:px-16">
      <div className="mx-auto">
        <div className="mb-8 w-full flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Daftar Tempat Wisata di Malang
          </h1>
          <p className="text-gray-600">
            Kelola data tempat wisata dengan mudah
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
                  <TableHead className="text-white font-semibold w-32">
                    Foto
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[140px]">
                    Nama Wisata
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[250px]">
                    Deskripsi
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[120px]">
                    Lokasi
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[100px]">
                    Kategori
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[100px]">
                    Harga Tiket
                  </TableHead>
                  <TableHead className="text-white font-semibold min-w-[120px]">
                    Kontak
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center min-w-[180px]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wisata.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-green-50 transition-colors duration-150 border-b border-gray-100"
                  >
                    <TableCell className="font-medium text-center text-gray-700">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md border-2 border-green-100">
                        <img
                          src={item.gambar}
                          alt={item.nama}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800 pr-4">
                      {item.nama}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm pr-4 text-balance">
                      {item.deskripsi || "-"}
                    </TableCell>
                    <TableCell className="text-gray-700 pr-4 text-sm text-balance">
                      {item.lokasi || "-"}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.kategori || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-gray-700 pr-5">
                      Rp.{" "}
                      {item.harga_tiket
                        ? item.harga_tiket?.mulai?.toLocaleString("id-ID", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 3,
                          }) || "-"
                        : "-"}
                      - Rp.{" "}
                      {item.harga_tiket?.sampai?.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 3,
                      }) || "-"}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {item.kontak || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 h-auto"
                          title="Detail"
                          onClick={() => navigasi("/detail/" + item.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 h-auto"
                          title="Edit"
                          onClick={() => navigasi("/edit-wisata/" + item.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
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

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan <span className="font-semibold">{wisata.length}</span>{" "}
              dari <span className="font-semibold">{total}</span> tempat wisata
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                Sebelumnya
              </Button>
              <span className="text-gray-700 text-sm">
                Halaman <b>{page}</b> dari <b>{totalPages || 1}</b>
              </span>
              <Button
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
