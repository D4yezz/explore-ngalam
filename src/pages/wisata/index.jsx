import Navbar from "@/components/layout/navbar/navbar";
import NavigasiTable from "@/components/layout/navigasiTable/navigasiTable";
import TableWisata from "@/components/layout/wisata/tableWisata";
import { Link } from "react-router-dom";

export default function WisataAdmin() {
  return (
    <section className="w-full pb-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar tombolAtas={"Tambah Wisata"} linkTombolAtas={"/form/wisata"} />
      <NavigasiTable
        kolomSatu={"Tabel Fasilitas"}
        linkSatu={"/tambah/fasilitas"}
        kolomDua={"Tabel Tiket"}
        linkDua={"/tambah/tiket"}
      />
      <TableWisata />
    </section>
  );
}
