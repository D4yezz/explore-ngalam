import { Link } from "react-router-dom";

const dataGrid = [
  {
    id: 1,
    title: "Bumi Perkemahan Bedengan",
    image: "/bedengan.webp",
    desc: "Desa Selorejo, Kec. Dau, Kabupaten Malang, Jawa Timur",
    className: "row-span-2",
  },
  {
    id: 2,
    title: "Coban Pelangi",
    image: "/coban-pelangi.jpg",
    desc: "Desa Ngadas, Kecamatan Poncokusumo, Kabupaten Malang, Jawa Timur.",
    className: "row-span-2 col-start-1 row-start-3",
  },
  {
    id: 3,
    title: "Hawai Waterpark",
    image: "/hawai.jpg",
    desc: "Jl. Graha Kencana Utara V, Karanglo, Banjararum, Kec. Singosari, Kabupaten Malang, Jawa Timur 65153",
    className: "row-span-4 col-span-2 col-start-2 row-start-1",
  },
  {
    id: 4,
    title: "Pantai Tanjung Penyu",
    image: "/pantai-tanjungpenyu.jpg",
    desc: "Desa Sitiharjo. Kecamatan Sumbermanjing Wetan, Malang, Jawa Timur",
    className: "col-span-3 row-span-2 col-start-4 row-start-1",
  },
  {
    id: 5,
    title: "Florawisata Santera De Laponte",
    image: "/santera.jpg",
    desc: "Pandesari, Kec. Pujon, Kabupaten Malang, Jawa Timur",
    className: "row-span-2 col-start-4 row-start-3",
  },
  {
    id: 6,
    title: "Jawa Timur Park 3",
    image: "/jatimpark3.jpg",
    desc: "Jl. Ir. Soekarno No.144, Beji, Kec. Junrejo, Kota Batu, Jawa Timur 65236",
    className: "col-span-2 row-span-2 col-start-5 row-start-3",
  },
];

export default function GridImage() {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-4 gap-6 h-dvh w-fit px-8">
        {dataGrid.map((item) => (
          <Link
            to={`/`}
            className={`group ${item.className} relative w-full h-full overflow-hidden rounded-3xl`}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:translate-y-2"
            />
            <div className="absolute bottom-0 w-full h-1/2 flex flex-col gap-2 text-white items-center justify-center bg-gradient-to-b from-transparent to-black from-1% to-90% opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
              <h2 className="text-2xl text-green-400 text-center font-semibold">
                {item.title}
              </h2>
              <p className="text-center text-[1rem] px-4 font-outfit">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
