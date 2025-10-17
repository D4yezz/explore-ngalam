import Navbar from "@/components/layout/navbar/navbar";
import TiketForm from "@/components/views/tiket/tiketForm";

export default function FormTiketPage() {
  return (
    <>
      <section className="w-full pb-16 gradiasi-hijau">
        <Navbar tombolAtas={"Tabel Tiket"} linkTombolAtas={"/tambah/tiket"} />
        <div className="px-16 pt-34 flex flex-col items-center font-urbanist relative">
          <h1 className="text-4xl font-bold text-white">
            Formulir Harga Tiket
          </h1>
          <TiketForm />
        </div>
      </section>
    </>
  );
}
