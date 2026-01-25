export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="w-full gradiasi-hijau text-white font-outfit shadow-[0_-10px_20px] shadow-black/10 h-fit py-4 flex justify-center items-center">
        <h2>© {year} Explore Ngalam. Semua hak dilindungi.</h2>
      </footer>
    </>
  );
}
