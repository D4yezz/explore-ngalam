import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const navbar = [
  {
    id: 1,
    title: "Beranda",
    link: "/",
  },
  {
    id: 2,
    title: "Rekomendasi",
    link: "/#rekomendasi",
  },
  {
    id: 3,
    title: "Wisata",
    link: "/wisata",
  },
];

export default function Navbar({ tombolAtas, linkTombolAtas }) {
  return (
    <>
      <header className="w-full font-urbanist absolute z-10 p-4">
        <nav className="flex items-center justify-center py-6 px-10">
          <div className="flex items-center w-1/3">
            <Link
              to={"/"}
              className="font-bold text-2xl bg-neutral-100 px-6 py-2 rounded-full shadow-md"
            >
              Explore
              <span className="gradiasi-hijau text-transparent bg-clip-text">
                Ngalam
              </span>
            </Link>
          </div>
          <div className="w-1/3 flex justify-center">
            <ul className="flex items-center gap-6 bg-neutral-100 px-8 py-3 rounded-full shadow-md w-fit">
              {navbar.map((item) => (
                <li key={item.id}>
                  <HashLink
                    smooth
                    to={item.link}
                    className="hover:text-green-500 text-lg font-montserrat font-medium duration-200 ease-in-out"
                  >
                    {item.title}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/3 flex justify-end">
            <Link
              to={linkTombolAtas}
              className="gradiasi-hijau font-semibold text-lg cursor-pointer text-white py-2 px-6 rounded-full border-[2px] border-neutral-100"
            >
              {tombolAtas}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
