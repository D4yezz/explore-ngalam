import { Link } from "react-router-dom";
import GridWisata from "./gridWisata";
import { ArrowRight } from "lucide-react";

export default function Wisata() {
  return (
    <>
      <section className="flex flex-col w-full font-outfit px-14 gap-14 my-20" id="wisata">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <h1 className="text-4xl font-semibold gradiasi-hijau text-transparent bg-clip-text">
              Jelajah Wisata di Malang
            </h1>
            <p className="text-lg">
              Ayo jelajahi wisata di Malang dan nikmati keindahan alam dan keanekaragaman wisata
            </p>
          </div>
          <Link
            to={"/tambah/wisata"}
            className="flex items-center gap-2 text-lg text-neutral-900"
          >
            Lihat Tabel Wisata
            <span className="gradiasi-hijau p-1 rounded-full text-white">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
        <GridWisata slice={true} search={false} />
        <Link
          to={"/wisata"}
          className="mx-auto text-green-500 text-xl underline underline-offset-2"
        >
          Lihat Semua Wisata
        </Link>
      </section>
    </>
  );
}
