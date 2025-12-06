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
import { useNavigate, useParams } from "react-router-dom";

export default function FormEditWisata() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fasilitas, setFasilitas] = useState([]);
  const [tiket, setTiket] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [oldImageUrl, setOldImageUrl] = useState("");

  const [editWisata, setEditWisata] = useState({
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

    const getWisataById = async () => {
      try {
        const { data, error } = await supabase
          .from("wisata")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching wisata:", error);
          toast.error("Gagal memuat data wisata");
          navigate("/tambah/wisata");
          return;
        }

        if (data) {
          setEditWisata({
            nama: data.nama || "",
            deskripsi: data.deskripsi || "",
            lokasi: data.lokasi || "",
            kategori: data.kategori || "",
            gambar: data.gambar || "",
            kontak: data.kontak || "",
            id_fasilitas: data.id_fasilitas,
            id_harga_tiket: data.id_harga_tiket,
          });

          if (data.gambar) {
            setPreviewUrl(data.gambar);
            setOldImageUrl(data.gambar);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan");
        setIsLoading(false);
      }
    };

    getWisataById();
  }, [id, navigate]);

  // Ganti Gambar
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
    setPreviewUrl(oldImageUrl || null);
  };

  const uploadImage = async () => {
    if (!imageFile) return oldImageUrl;

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

    
      if (oldImageUrl) {
        const oldFilePath = oldImageUrl.split(
          "/storage/v1/object/public/foto/"
        )[1];

        if (oldFilePath) {
          const { error: removeError } = await supabase.storage
            .from("foto")
            .remove([oldFilePath]);

          if (removeError) {
            console.error("Error removing old image:", removeError);
          } else {
            console.log("Old image deleted successfully:", oldFilePath);
          }
        }
      }

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengupload gambar");
      return null;
    }
  };

  const handleUpdateWisata = async (e) => {
    e.preventDefault();

    if (!editWisata.nama.trim()) {
      toast.error("Nama wisata harus diisi!");
      return;
    }

    if (!editWisata.id_fasilitas) {
      toast.error("Pilih fasilitas wisata!");
      return;
    }

    if (!editWisata.id_harga_tiket) {
      toast.error("Pilih harga tiket!");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadImage();

      if (imageFile && !imageUrl) {
        setIsUploading(false);
        return;
      }

      // mengupdate data wisata
      const { error } = await supabase
        .from("wisata")
        .update({
          nama: editWisata.nama,
          deskripsi: editWisata.deskripsi,
          lokasi: editWisata.lokasi,
          kategori: editWisata.kategori,
          gambar: imageUrl,
          kontak: editWisata.kontak,
          id_fasilitas: editWisata.id_fasilitas,
          id_harga_tiket: editWisata.id_harga_tiket,
        })
        .eq("id", id);

      if (error) {
        console.error("Update error:", error);
        toast.error("Gagal mengupdate wisata: " + error.message);
        setIsUploading(false);
        return;
      }

      toast.success("Wisata berhasil diupdate!");

      setTimeout(() => {
        navigate("/tambah/wisata");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-12 flex justify-center font-montserrat">
      <form
        onSubmit={handleUpdateWisata}
        className="flex flex-col gap-8 lg:w-[50vw] w-full rounded-3xl shadow-lg p-6 bg-white"
      >
        <h3 className="text-2xl font-medium font-outfit gradiasi-hijau text-transparent bg-clip-text">
          Edit Destinasi Wisata
        </h3>

        <div className="flex flex-col gap-5 w-full">
          <InputTemplate
            label={"Nama Wisata"}
            id={"nama-wisata"}
            type={"text"}
            placeholder={"cth: Selecta"}
            value={editWisata.nama}
            onChange={(e) =>
              setEditWisata({ ...editWisata, nama: e.target.value })
            }
            required
          />

          <TextareaTemplate
            label={"Deskripsi"}
            id={"deskripsi-wisata"}
            placeholder={"Deksripsikan tempat wisata"}
            value={editWisata.deskripsi}
            onChange={(e) =>
              setEditWisata({ ...editWisata, deskripsi: e.target.value })
            }
          />

          <TextareaTemplate
            label={"Lokasi Wisata"}
            id={"lokasi-wisata"}
            placeholder={"Lokasi tempat wisata"}
            value={editWisata.lokasi}
            onChange={(e) =>
              setEditWisata({ ...editWisata, lokasi: e.target.value })
            }
          />

          <InputTemplate
            label={"Kategori Wisata"}
            id={"kategori-wisata"}
            type={"text"}
            placeholder={"cth: Alam, Pantai, Buatan, dll."}
            value={editWisata.kategori}
            onChange={(e) =>
              setEditWisata({ ...editWisata, kategori: e.target.value })
            }
          />

          <div className="grid w-full items-center gap-2">
            <Label className={"text-lg font-medium"}>
              Tiket Masuk <span className="text-red-500">*</span>
            </Label>
            <Select
              value={editWisata.id_harga_tiket?.toString()}
              onValueChange={(value) =>
                setEditWisata({
                  ...editWisata,
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
            value={editWisata.kontak}
            onChange={(e) =>
              setEditWisata({ ...editWisata, kontak: e.target.value })
            }
          />

          <div className="grid w-full items-center gap-2">
            <Label className={"text-lg font-medium"}>
              Foto Wisata
              {!oldImageUrl && <span className="text-red-500"> *</span>}
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
                  {imageFile && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  {!imageFile && oldImageUrl && (
                    <div className="absolute top-2 left-2 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                      Gambar Saat Ini
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-700 font-medium truncate">
                    {imageFile?.name || "Gambar sudah ada"}
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
              value={editWisata.id_fasilitas?.toString()}
              onValueChange={(value) =>
                setEditWisata({
                  ...editWisata,
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
            onClick={() => navigate("/tambah/wisata")}
          >
            Batal
          </Button>
          <Button
            className={"px-4 py-2 bg-green-500 hover:bg-green-600"}
            type={"submit"}
            disabled={isUploading}
          >
            {isUploading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
