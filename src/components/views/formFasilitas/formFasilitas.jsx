import {
  InputTemplate,
  TextareaTemplate,
} from "@/components/layout/input/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function FormFasilitas() {
  const [tambahFasilitas, setTambahFasilitas] = useState({
    nama: "",
    deskripsi: "",
    kategori: "",
    kapasitas: "",
  });
  const navigasi = useNavigate();
  const [Loading, setLoading] = useState(false);

  const handleInsertFasilitas = async (e) => {
    e.preventDefault();

    if (!tambahFasilitas.nama.trim()) {
      toast.error("Nama wisata harus diisi!");
      return;
    }

    if (!tambahFasilitas.kapasitas) {
      toast.error("Masukkan Kapasitas");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase
        .from("fasilitas")
        .insert({
          nama: tambahFasilitas.nama,
          deskripsi: tambahFasilitas.deskripsi,
          kategori_fasilitas: tambahFasilitas.kategori_fasilitas,
          kapasitas: tambahFasilitas.kapasitas,
        })
        .select();

      if (error) {
        console.error("Insert error:", error);
        toast.error("Gagal menambahkan Fasilitas: " + error.message);
        return;
      }

      toast.success("Fasilitas Wisata berhasil ditambahkan!");

      setTambahFasilitas({
        nama: "",
        deskripsi: "",
        kategori_fasilitas: "",
        kapasitas: "",
      });

      navigasi("/tambah/fasilitas");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mt-12 flex justify-center font-montserrat">
        <form
          onSubmit={handleInsertFasilitas}
          className="flex flex-col gap-8 lg:w-[50vw] w-full rounded-3xl shadow-lg p-6 bg-white"
        >
          <h3 className="text-2xl font-medium font-outfit gradiasi-hijau text-transparent bg-clip-text">
            Isi Formulir Fasilitas Berikut
          </h3>

          <div className="flex flex-col gap-5 w-full">
            <InputTemplate
              label={"Nama Fasilitas"}
              id={"nama-fasilitas"}
              type={"text"}
              placeholder={"cth: Restoran"}
              value={tambahFasilitas.nama}
              onChange={(e) =>
                setTambahFasilitas({ ...tambahFasilitas, nama: e.target.value })
              }
              required
            />

            <TextareaTemplate
              label={"Deskripsi"}
              id={"deskripsi-wisata"}
              placeholder={"Deksripsikan tempat wisata"}
              value={tambahFasilitas.deskripsi}
              onChange={(e) =>
                setTambahFasilitas({
                  ...tambahFasilitas,
                  deskripsi: e.target.value,
                })
              }
            />

            <InputTemplate
              label={"Kategori Fasilitas"}
              id={"kategori-fasilitas"}
              type={"text"}
              placeholder={"cth: Makanan, Kesahatan, dll."}
              value={tambahFasilitas.kategori_fasilitas}
              onChange={(e) =>
                setTambahFasilitas({
                  ...tambahFasilitas,
                  kategori_fasilitas: e.target.value,
                })
              }
            />

            <InputTemplate
              label={"Kapasitas (orang)"}
              id={"kapasitas"}
              type={"number"}
              placeholder={"cth: 30"}
              value={tambahFasilitas.kapasitas}
              onChange={(e) =>
                setTambahFasilitas({
                  ...tambahFasilitas,
                  kapasitas: e.target.value,
                })
              }
            />
          </div>

          <div className="flex w-full justify-between gap-3">
            <Button
              type="button"
              className={"px-4 py-2 bg-red-600 hover:bg-red-700"}
              onClick={() => window.history.back()}
            >
              Kembali
            </Button>
            <Button
              className={"px-4 py-2 bg-green-500 hover:bg-green-600"}
              type={"submit"}
              disabled={Loading}
            >
              {Loading ? "Menambahkan..." : "Tambah Fasilitas"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
