import { Link } from "react-router-dom";

export default function NavigasiTable({
  kolomSatu,
  kolomDua,
  linkSatu,
  linkDua,
}) {
  return (
    <>
      <div className="w-full pt-40">
        <div className="w-[60vw] mx-auto py-1 rounded-md shadow-lg text-xl font-poppins tracking-wide font-semibold gradiasi-hijau flex items-center justify-center gap-1 px-4">
          <Link
            to={linkSatu}
            className="w-full h-12 bg-green-50 text-green-500 flex items-center justify-center py-1 rounded-l-full"
          >
            {kolomSatu}
          </Link>
          <Link
            to={linkDua}
            className="w-full h-12 bg-green-50 text-green-500 flex items-center justify-center py-1 rounded-r-full"
          >
            {kolomDua}
          </Link>
        </div>
      </div>
    </>
  );
}
