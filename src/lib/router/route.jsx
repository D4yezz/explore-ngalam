import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home";
import WisataAdmin from "@/pages/wisata";
import WisataUser from "@/pages/wisata/wisataUser";
import FormWisata from "@/pages/form/formWisata";
import DetailWisata from "@/pages/detailWisata/detail";
import EditWisata from "@/pages/form/editWisata";
import FasilitasPage from "@/pages/fasilitas/fasilitas";
import FormFasilitasPage from "@/pages/form/formFasilitas";
import TiketPage from "@/pages/tiket/tiketPage";
import FormTiketPage from "@/pages/form/formTiket";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // Wisata
  {
    path: "/wisata",
    element: <WisataUser />,
  },
  {
    path: "/tambah/wisata",
    element: <WisataAdmin />,
  },
  {
    path: "/form/wisata",
    element: <FormWisata />,
  },
  {
    path: "/detail/:id",
    element: <DetailWisata />,
  },
  {
    path: "/edit-wisata/:id",
    element: <EditWisata />,
  },
  // Wisata

  // Fasilitas
  {
    path: "/tambah/fasilitas",
    element: <FasilitasPage />,
  },
  { path: "/form/fasilitas", element: <FormFasilitasPage /> },
  // Fasilitas

  // harga tiket
  {
    path: "/tambah/tiket",
    element: <TiketPage />,
  },

  {
    path: "/form/tiket",
    element: <FormTiketPage />,
  },
  // harga tiket
]);
