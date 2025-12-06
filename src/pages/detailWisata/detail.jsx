import Navbar from "@/components/layout/navbar/navbar";
import { supabase } from "@/lib/supabase/supabaseClient";
import { MapPin, Phone, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailWisata() {
  const [wisata, setWisata] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getWisata = async () => {
      const { data, error } = await supabase
        .from("wisata")
        .select("*, fasilitas(*), harga_tiket(*)")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }
      setWisata(data);
    };
    getWisata();
  }, [id]);
  return (
    <>
      <section className="w-full">
        <Navbar tombolAtas={"Tabel Wisata"} linkTombolAtas={"/tambah/wisata"} />
        <div className="flex w-full h-fit lg:px-16 px-6 pt-30 pb-16 font-poppins">
          {wisata && (
            <div className="flex lg:flex-row flex-col gap-8 px-8 py-8 w-full lg:h-dvh gradiasi-hijau text-white rounded-4xl overflow-hidden shadow-xl">
              <div className="lg:w-1/2 h-full rounded-4xl overflow-hidden border-3 border-white shadow-xl relative">
                <img
                  src={wisata.gambar}
                  alt={wisata.nama}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-5 left-5 w-fit h-fit gradiasi-hijau border-2 border-white text-white text-lg px-6 py-2 font-medium rounded-full flex items-center gap-2">
                  {wisata.kategori}
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col gap-4 justify-center pr-4">
                <h2 className="lg:text-5xl text-3xl font-medium">
                  {wisata.nama}
                </h2>
                <p className="lg:text-lg">{wisata.deskripsi}</p>
                <div className="text-md flex items-center gap-4 border-2 border-white h-20 rounded-xl overflow-hidden">
                  <span className="bg-white text-green-500 h-full items-center flex px-4">
                    <MapPin size={26} />
                  </span>
                  <h2>{wisata.lokasi}</h2>
                </div>
                <span className="flex items-center gap-2 mt-2 rounded-full bg-white text-green-500 w-fit px-4 py-1.5">
                  <Ticket size={20} />
                  Rp.
                  {wisata.harga_tiket
                    ? wisata.harga_tiket?.mulai?.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 3,
                      }) || "-"
                    : "-"}{" "}
                  - Rp.
                  {wisata.harga_tiket?.sampai?.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 3,
                  }) || "-"}
                </span>
                <div className="flex items-center bg-white text-green-500 w-fit rounded-full h-10 gap-3 border-2 pr-4 borded-white">
                  <h2 className="rounded-full gradiasi-hijau text-white px-4 h-full flex items-center font-medium">
                    Fasilitas yang tersedia
                  </h2>
                  <p>{wisata.fasilitas?.nama}</p>
                </div>
                <div className="bg-neutral-800 text-green-400 text-lg w-fit px-6 py-2 font-semibold rounded-lg flex items-center gap-2">
                  <Phone size={18} /> {wisata.kontak || "Tidak ada kontak"}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
