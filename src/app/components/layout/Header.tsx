import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            Pizza na pedra
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Menu</Link>
          <Link href={"/"}>Sobre nós</Link>
          <Link href={"/"}>Contato</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-600">
          <Link href={"/login"}>Login</Link>
          <Link
            href={"/register"}
            className="bg-primary rounded-full text-white px-8 py-2"
          >
            Registrar
          </Link>
        </nav>
      </header>
    </div>
  );
}
