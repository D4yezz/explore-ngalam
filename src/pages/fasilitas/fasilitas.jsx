import Navbar from "@/components/layout/navbar/navbar";
import NavigasiTable from "@/components/layout/navigasiTable/navigasiTable";
import FasilitasTable from "@/components/views/fasilitas/fasilitasTable";

export default function FasilitasPage() {
  return (
    <>
      <section className="w-full pb-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar tombolAtas={"Tambah Fasilitas"} linkTombolAtas={"/form/fasilitas"} />
        <NavigasiTable
          kolomSatu={"Tabel Wisata"}
          linkSatu={"/tambah/wisata"}
          kolomDua={"Tabel Tiket"}
          linkDua={"/tambah/tiket"}
        />
        <FasilitasTable />
      </section>
    </>
  );
}
