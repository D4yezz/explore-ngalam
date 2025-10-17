/* eslint-disable */
import { motion } from "framer-motion";
import GridImage from "./gridImage";
export default function Recommendation() {
  return (
    <section id="rekomendasi" className="w-full font-urbanist px-6 my-12">
      <div className="flex flex-col gap-3 items-center mb-8">
        <h1 className="text-5xl font-bold text-center gradiasi-hijau text-transparent bg-clip-text">
          Rekomendasi Wisata
        </h1>
        <p className="text-lg text-center font-normal w-2/4 font-poppins">
          Rekomendasi wisata yang paling banyak diminati dan dikunjungi di
          Malang. Tidak hanya wisata alamnya yang menarik, tetapi wisata buatan
          juga banyak diminati oleh para pengunjung lokal maupun pengunjung
          mancanegara.
        </p>
      </div>
      <GridImage />
    </section>
  );
}
