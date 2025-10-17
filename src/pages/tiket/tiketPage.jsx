import Navbar from "@/components/layout/navbar/navbar";
import NavigasiTable from "@/components/layout/navigasiTable/navigasiTable";
import TiketTable from "@/components/views/tiket/tiketTable";

export default function TiketPage() {
  return (
    <>
      <section className="w-full pb-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar
          tombolAtas={"Tambah Harga Tiket"}
          linkTombolAtas={"/form/tiket"}
        />
        <NavigasiTable
          kolomSatu={"Tabel Fasilitas"}
          linkSatu={"/tambah/fasilitas"}
          kolomDua={"Tabel Wisata"}
          linkDua={"/tambah/wisata"}
        />
        <TiketTable/>
      </section>
    </>
  );
}
