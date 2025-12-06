import {
  InputTemplate,
  TextareaTemplate,
} from "@/components/layout/input/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function TiketForm() {
  const [tambahTiket, setTambahTiket] = useState({
    nama_tarif: "",
    mulai: "",
    sampai: "",
    catatan_tambahan: "",
  });
  const navigasi = useNavigate();
  const [Loading, setLoading] = useState(false);

  const handleInsertTiket = async (e) => {
    e.preventDefault();

    if (!tambahTiket.nama_tarif.trim()) {
      toast.error("Nama Tarif harus diisi!");
      return;
    }

    if (!tambahTiket.mulai) {
      toast.error("Masukkan Nominal Harga Tiket");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase
        .from("harga_tiket")
        .insert({
          nama_tarif: tambahTiket.nama_tarif,
          mulai: tambahTiket.mulai,
          sampai: tambahTiket.sampai,
          catatan_tambahan: tambahTiket.catatan_tambahan,
        })
        .select();

      if (error) {
        console.error("Insert error:", error);
        toast.error("Gagal menambahkan Harga Tiket: " + error.message);
        return;
      }

      toast.success("Harga Tiket berhasil ditambahkan!");

      setTambahTiket({
        nama_tarif: "",
        mulai: "",
        sampai: "",
        catatan_tambahan: "",
      });

      navigasi("/tambah/tiket");
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
          onSubmit={handleInsertTiket}
          className="flex flex-col gap-8 lg:w-[50vw] w-full rounded-3xl shadow-lg p-6 bg-white"
        >
          <h3 className="text-2xl font-medium font-outfit gradiasi-hijau text-transparent bg-clip-text">
            Isi Formulir Fasilitas Berikut
          </h3>

          <div className="flex flex-col gap-5 w-full">
            <InputTemplate
              label={"Nama Tarif"}
              id={"tarif"}
              type={"text"}
              placeholder={"cth: Tarif Hemat, Tarif Biasa, dll."}
              value={tambahTiket.nama_tarif}
              onChange={(e) =>
                setTambahTiket({ ...tambahTiket, nama_tarif: e.target.value })
              }
              required
            />
            <InputTemplate
              label={"Harga Tiket Mulai Dari"}
              id={"mulai"}
              type={"number"}
              placeholder={"cth: 10000"}
              value={tambahTiket.mulai}
              onChange={(e) =>
                setTambahTiket({
                  ...tambahTiket,
                  mulai: e.target.value,
                })
              }
            />
            <InputTemplate
              label={"Harga Tiket Sampai Dengan"}
              id={"sampai"}
              type={"number"}
              placeholder={"cth: 50000"}
              value={tambahTiket.sampai}
              onChange={(e) =>
                setTambahTiket({
                  ...tambahTiket,
                  sampai: e.target.value,
                })
              }
            />

            <TextareaTemplate
              label={"Catatan Tambahan"}
              id={"catatan"}
              placeholder={"Catatan Tambahan Bila Ada"}
              value={tambahTiket.catatan_tambahan}
              onChange={(e) =>
                setTambahTiket({
                  ...tambahTiket,
                  catatan_tambahan: e.target.value,
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
              {Loading ? "Menambahkan..." : "Tambah Harga Tiket"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
