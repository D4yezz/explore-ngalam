import Navbar from "@/components/layout/navbar/navbar";
import GridWisata from "@/components/layout/wisata/gridWisata";


export default function WisataUser() {
  return (
    <>
      <section className="w-full pb-16">
        <Navbar tombolAtas={"Tabel Wisata"} linkTombolAtas={"/tambah/wisata"} />
        <div className="w-full px-14 pt-38 font-urbanist">
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="text-5xl font-bold text-center gradiasi-hijau text-transparent bg-clip-text py-2">
              Daftar Wisata di Malang
            </h1>
          </div>
          <GridWisata slice={false} />
        </div>
      </section>
    </>
  );
}
