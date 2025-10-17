import Recommendation from "@/components/layout/recommendation/recommendation";
import Navbar from "../components/layout/navbar/navbar";
import Welcome from "../components/layout/welcome/welcome";
import Wisata from "@/components/layout/wisata/wisata";
import Footer from "@/components/views/footer/footer";

export default function Home() {
  return (
    <>
      <section className="w-full">
        <Navbar tombolAtas={"Tabel Wisata"} linkTombolAtas={"/tambah/wisata"} />
        <Welcome />
        <Recommendation />
        <Wisata />
        <Footer />
      </section>
    </>
  );
}
