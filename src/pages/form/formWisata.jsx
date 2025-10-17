import Form from "@/components/layout/formWisata/form";
import Navbar from "@/components/layout/navbar/navbar";

export default function FormWisata() {
  return (
    <>
      <section className="w-full pb-16 gradiasi-hijau">
        <Navbar tombolAtas={"Tabel Wisata"} linkTombolAtas={"/tambah/wisata"} />
        <div className="px-16 pt-34 flex flex-col items-center font-urbanist relative">
          <h1 className="text-4xl font-bold text-white">
            Formulir Tempat Wisata
          </h1>
          <Form />
        </div>
      </section>
    </>
  );
}
