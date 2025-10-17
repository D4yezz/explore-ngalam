
import FormEditWisata from "@/components/layout/formWisata/formEditWisata";
import Navbar from "@/components/layout/navbar/navbar";

export default function EditWisata(){
    return(
        <>
        <section className="w-full pb-16 bg-green-100">
            <Navbar tombolAtas={"Tabel Wisata"} linkTombolAtas={"/tambah/wisata"} />
            <div className="px-16 pt-34 flex flex-col items-center font-urbanist relative">
                <h1 className="text-4xl font-bold gradiasi-hijau text-transparent bg-clip-text">
                    Edit Tempat Wisata
                </h1>
                <FormEditWisata/>
            </div>
        </section>
        </>
    )
}