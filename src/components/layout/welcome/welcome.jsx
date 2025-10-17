/* eslint-disable */
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { supabase } from "@/lib/supabase/supabaseClient";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getRandomWisata = async () => {
    const { data, error } = await supabase
      .from("wisata")
      .select("*")
      .order("id", { ascending: false })
      .limit(5);
    if (!error) setWisata(data);
  };

  const searchWisata = async (keyword) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("wisata")
      .select("*")
      .ilike("nama", `%${keyword}%`);
    if (!error) setWisata(data);
    setLoading(false);
  };

  useEffect(() => {
    if (search.trim() === "") {
      getRandomWisata();
      return;
    }

    const delay = setTimeout(() => {
      searchWisata(search);
    }, 200); 

    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    getRandomWisata();
  }, []);

  return (
    <section className="w-full py-6 px-8 font-poppins relative z-0 h-dvh">
      <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-xl">
        <img
          src="/balaikota.webp"
          alt=""
          className="w-full h-full object-cover absolute z-0 brightness-75"
        />
        <div className="z-10 relative w-full h-full flex flex-col gap-4 items-center justify-center">
          <h1 className="text-6xl font-semibold text-white">
            Jelajah Tempat Wisata di{" "}
            <span className="text-transparent gradiasi-hijau bg-clip-text">
              Malang
            </span>
          </h1>
          <p className="text-white w-1/2 text-center text-lg">
            Temukan keindahanan alam dan keanekaragaman wisata di Malang. Mulai
            dari pantai, air terjun, kebun binatang, wisata air, wahana dan
            lain-lain.
          </p>

          <div className="w-2/4 relative rounded-full">
            <Command className="rounded-full px-4">
              <CommandInput
                placeholder="Cari tempat wisata..."
                value={search}
                onValueChange={(val) => setSearch(val)}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
                className="h-12"
              />

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-white w-full mx-auto left-0 right-0 top-16 rounded-2xl shadow-lg overflow-hidden z-50"
                  >
                    <CommandList>
                      {loading ? (
                        <div className="p-4 text-center text-gray-500">
                          Mencari...
                        </div>
                      ) : wisata.length === 0 ? (
                        <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                      ) : (
                        <CommandGroup heading="Hasil Pencarian">
                          {wisata.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() => navigate(`/detail/${item.id}`)}
                            >
                              {item.nama}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </motion.div>
                )}
              </AnimatePresence>
            </Command>
          </div>
        </div>
      </div>
    </section>
  );
}
