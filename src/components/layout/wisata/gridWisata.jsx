import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Command, CommandInput } from "@/components/ui/command";

export default function GridWisata({ slice = true, search = true }) {
  const [wisata, setWisata] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDataDitemukan, setIsDataDitemukan] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const getWisata = async (searchValue = "") => {
    let queryBuilder = supabase
      .from("wisata")
      .select("*, harga_tiket(*)")
      .order("nama", { ascending: true });

    if (searchValue) {
      queryBuilder = queryBuilder.ilike("nama", `%${searchValue}%`);
    }

    const { data, error } = await queryBuilder;
    if (error) {
      console.error("Supabase error:", error);
    } else {
      setWisata(data);
      setIsDataDitemukan(data.length > 0);
    }
  };

  useEffect(() => {
    getWisata(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    getWisata();
  }, []);

  return (
    <>
      {search && (
        <div className="w-2/4 relative mx-auto mb-20">
          <Command className="rounded-full bg-green-50 border-2 border-green-500 px-4">
            <CommandInput
              placeholder="Cari tempat wisata..."
              value={query}
              onChangeCapture={(e) => setQuery(e.target.value)}
              className="h-12 placeholder:text-green-500 text-lg"
            />
          </Command>
        </div>
      )}
      {isDataDitemukan ? (
        <div className="grid grid-cols-3 gap-14 font-poppins">
          {wisata.slice(0, slice ? 6 : wisata.length).map((item) => (
            <Card
              className="rounded-4xl shadow-lg overflow-hidden hover:shadow-xl justify-between hover:scale-[102%] duration-200 ease-in-out"
              key={item.id}
            >
              <CardHeader>
                <div className="w-full h-90 relative">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 rounded-full px-4 py-1.5 text-white gradiasi-hijau border-2 border-white">
                    {item.kategori}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl hover:text-green-500 cursor-pointer">
                  <Link to={`/detail/${item.id}`}>{item.nama}</Link>
                </CardTitle>
                <span className="flex items-center gap-2 mt-2 rounded-full text-white gradiasi-hijau w-fit px-4 py-1.5">
                  <Ticket size={20} />
                  Rp.
                  {item.harga_tiket
                    ? item.harga_tiket?.mulai?.toLocaleString("id-ID") || "-"
                    : "-"}{" "}
                  - Rp.
                  {item.harga_tiket?.sampai?.toLocaleString("id-ID") || "-"}
                </span>
                <p className="line-clamp-2 mt-4 text-lg">{item.deskripsi}</p>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/detail/${item.id}`}
                  className="w-full gradiasi-hijau text-lg rounded-full flex items-center justify-center text-white font-medium py-2 cursor-pointer"
                >
                  Detail
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-1 items-center justify-center text-neutral-400 font-montserrat">
          <p className="text-xl  font-semibold">Data tidak ditemukan.</p>
          <Link
            to="/form/wisata"
            className="text-md font-medium text-green-400"
          >
            Tambah Wisata
          </Link>
        </div>
      )}
    </>
  );
}
