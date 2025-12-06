import Navbar from "@/components/layout/navbar/navbar";
import FormFasilitas from "@/components/views/formFasilitas/formFasilitas";

export default function FormFasilitasPage() {
  return (
    <>
      <section className="w-full pb-16 gradiasi-hijau">
        <Navbar
          tombolAtas={"Tabel Fasilitas"}
          linkTombolAtas={"/tambah/fasilitas"}
        />
        <div className="lg:px-16 px-6 pt-34 flex flex-col items-center font-urbanist relative">
          <h1 className="text-4xl font-bold text-white">
            Formulir Fasilitas Wisata
          </h1>
          <FormFasilitas />
        </div>
      </section>
    </>
  );
}
