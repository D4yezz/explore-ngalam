/** eslint-disable */
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "motion/react";

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
  const [isOpen, setIsOpen] = useState(false);
  const isDekstop = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  useEffect(() => {
    if (isDekstop) {
      setIsOpen(false);
    }
  }, [isDekstop]);

  return (
    <>
      <header className="w-full font-urbanist absolute z-10 p-4">
        <nav className="w-full flex items-center lg:justify-center justify-between py-6 px-10">
          <div className="flex items-center w-1/3">
            <Link
              to={"/"}
              className="font-bold lg:text-2xl text-xl bg-neutral-100 px-6 py-2 rounded-full shadow-md"
            >
              Explore
              <span className="gradiasi-hijau text-transparent bg-clip-text">
                Ngalam
              </span>
            </Link>
          </div>
          {isDekstop ? (
            <>
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
            </>
          ) : (
            <>
              <Button
                size={"icon"}
                className="gradiasi-hijau border-2 border-neutral-100"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu />
              </Button>
              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full h-dvh bg-black/20 absolute z-10 top-0 left-0"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      className="w-full h-fit shadow-lg bg-neutral-100 absolute z-20 top-0 left-0 flex flex-col items-center justify-center gap-6 py-8"
                    >
                      <Button
                        onClick={() => setIsOpen(!isOpen)}
                        size={"icon"}
                        className={"absolute top-5 right-5 gradiasi-hijau"}
                      >
                        <X />
                      </Button>
                      {navbar.map((item) => (
                        <HashLink
                          smooth
                          to={item.link}
                          className="hover:text-green-500 text-xl font-montserrat font-medium duration-200 ease-in-out"
                        >
                          {item.title}
                        </HashLink>
                      ))}
                      <Link
                        to={linkTombolAtas}
                        className="gradiasi-hijau font-semibold text-xl cursor-pointer text-white py-2 px-6 rounded-full border-[2px] border-neutral-100"
                      >
                        {tombolAtas}
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              {/* <div className="w-full h-full bg-neutral-100 absolute top-0 left-0">halo</div> */}
            </>
          )}
        </nav>
      </header>
    </>
  );
}
