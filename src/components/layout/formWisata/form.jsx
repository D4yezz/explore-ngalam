import { InputTemplate, TextareaTemplate } from "../input/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [fasilitas, setFasilitas] = useState([]);
  const [tiket, setTiket] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [tambahWisata, setTambahWisata] = useState({
    nama: "",
    deskripsi: "",
    lokasi: "",
    kategori: "",
    gambar: "",
    kontak: "",
    id_fasilitas: null,
    id_harga_tiket: null,
  });

  const getFasilitas = async () => {
    const { data, error } = await supabase
      .from("fasilitas")
      .select("*")
      .order("nama", { ascending: true });
    if (error) {
      console.log(error);
      toast.error("Gagal memuat data fasilitas");
      return;
    }
    setFasilitas(data);
  };

  const getTiket = async () => {
    const { data, error } = await supabase
      .from("harga_tiket")
      .select("*")
      .order("mulai", { ascending: true });
    if (error) {
      console.log(error);
      toast.error("Gagal memuat data harga tiket");
      return;
    }
    setTiket(data);
  };

  useEffect(() => {
    getFasilitas();
    getTiket();
  }, []);

  // memvalidasi Gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar yang diperbolehkan!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB!");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Upload gambar
  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error } = await supabase.storage
        .from("foto")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from("foto")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengupload gambar");
      return null;
    }
  };
  const navigasi = useNavigate();
  const handleInsertWisata = async (e) => {
    e.preventDefault();

    if (!tambahWisata.nama.trim()) {
      toast.error("Nama wisata harus diisi!");
      return;
    }

    if (!tambahWisata.id_fasilitas) {
      toast.error("Pilih fasilitas wisata!");
      return;
    }

    if (!tambahWisata.id_harga_tiket) {
      toast.error("Pilih harga tiket!");
      return;
    }

    if (!imageFile) {
      toast.error("Upload foto wisata!");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadImage();

      if (!imageUrl) {
        setIsUploading(false);
        return;
      }

      const { error } = await supabase
        .from("wisata")
        .insert({
          nama: tambahWisata.nama,
          deskripsi: tambahWisata.deskripsi,
          lokasi: tambahWisata.lokasi,
          kategori: tambahWisata.kategori,
          gambar: imageUrl,
          kontak: tambahWisata.kontak,
          id_fasilitas: tambahWisata.id_fasilitas,
          id_harga_tiket: tambahWisata.id_harga_tiket,
        })
        .select();

      if (error) {
        console.error("Insert error:", error);
        toast.error("Gagal menambahkan wisata: " + error.message);
        setIsUploading(false);
        return;
      }

      toast.success("Wisata berhasil ditambahkan!");

      setTambahWisata({
        nama: "",
        deskripsi: "",
        lokasi: "",
        kategori: "",
        gambar: "",
        kontak: "",
        id_fasilitas: null,
        id_harga_tiket: null,
      });
      setImageFile(null);
      setPreviewUrl(null);

      navigasi("/tambah/wisata");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full mt-12 flex justify-center font-montserrat">
      <form
        onSubmit={handleInsertWisata}
        className="flex flex-col gap-8 w-[50vw] rounded-3xl shadow-lg p-6 bg-white"
      >
        <h3 className="text-2xl font-medium font-outfit gradiasi-hijau text-transparent bg-clip-text">
          Ayo Tambahkan Destinasi Wisata Favorit Kamu
        </h3>

        <div className="flex flex-col gap-5 w-full">
          <InputTemplate
            label={"Nama Wisata"}
            id={"nama-wisata"}
            type={"text"}
            placeholder={"cth: Selecta"}
            value={tambahWisata.nama}
            onChange={(e) =>
              setTambahWisata({ ...tambahWisata, nama: e.target.value })
            }
            required
          />

          <TextareaTemplate
            label={"Deskripsi"}
            id={"deskripsi-wisata"}
            placeholder={"Deksripsikan tempat wisata"}
            value={tambahWisata.deskripsi}
            onChange={(e) =>
              setTambahWisata({ ...tambahWisata, deskripsi: e.target.value })
            }
          />

          <TextareaTemplate
            label={"Lokasi Wisata"}
            id={"lokasi-wisata"}
            placeholder={"Lokasi tempat wisata"}
            value={tambahWisata.lokasi}
            onChange={(e) =>
              setTambahWisata({ ...tambahWisata, lokasi: e.target.value })
            }
          />

          <InputTemplate
            label={"Kategori Wisata"}
            id={"kategori-wisata"}
            type={"text"}
            placeholder={"cth: Alam, Pantai, Buatan, dll."}
            value={tambahWisata.kategori}
            onChange={(e) =>
              setTambahWisata({ ...tambahWisata, kategori: e.target.value })
            }
          />

          <div className="grid w-full items-center gap-2">
            <Label className={"text-lg font-medium"}>
              Tiket Masuk <span className="text-red-500">*</span>
            </Label>
            <Select
              value={tambahWisata.id_harga_tiket?.toString()}
              onValueChange={(value) =>
                setTambahWisata({
                  ...tambahWisata,
                  id_harga_tiket: parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih jenis tiket" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tiket</SelectLabel>
                  {tiket.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      Rp.{" "}
                      {item.mulai.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}{" "}
                      - Rp.{" "}
                      {item.sampai.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <InputTemplate
            label={"Kontak"}
            id={"kontak-wisata"}
            type={"text"}
            placeholder={"cth: 08123456789"}
            value={tambahWisata.kontak}
            onChange={(e) =>
              setTambahWisata({ ...tambahWisata, kontak: e.target.value })
            }
          />


          <div className="grid w-full items-center gap-2">
            <Label className={"text-lg font-medium"}>
              Foto Wisata <span className="text-red-500">*</span>
            </Label>

            {!previewUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-green-400 transition-colors">
                <label
                  htmlFor="foto-wisata"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Klik untuk upload foto
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF (Max 5MB)
                    </p>
                  </div>
                  <input
                    id="foto-wisata"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="relative border-2 border-green-200 rounded-lg p-4 bg-green-50">
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-700 font-medium truncate">
                    {imageFile?.name}
                  </p>
                  <label
                    htmlFor="foto-wisata-change"
                    className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer"
                  >
                    Ganti Foto
                  </label>
                  <input
                    id="foto-wisata-change"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label className={"text-lg font-medium"}>
              Fasilitas Wisata <span className="text-red-500">*</span>
            </Label>
            <Select
              value={tambahWisata.id_fasilitas?.toString()}
              onValueChange={(value) =>
                setTambahWisata({
                  ...tambahWisata,
                  id_fasilitas: parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Fasilitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fasilitas</SelectLabel>
                  {fasilitas.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      className="capitalize"
                    >
                      {item.nama}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex w-full justify-between gap-3">
          <Button
            type="button"
            className={"px-4 py-2 bg-red-600 hover:bg-red-700"}
            onClick={() => navigasi("/tambah/wisata")}
          >
            Kembali
          </Button>
          <Button
            className={"px-4 py-2 bg-green-500 hover:bg-green-600"}
            type={"submit"}
            disabled={isUploading}
          >
            {isUploading ? "Menambahkan..." : "Tambah Wisata"}
          </Button>
        </div>
      </form>
    </div>
  );
}
