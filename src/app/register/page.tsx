import Image from "next/image";

export default function RegisterPage() {
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Registrar</h1>
      <form action="" className="block max-w-sm mx-auto mb-8">
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Registrar</button>
        <div className="my-4 text-gray-600 text-center">
          Ou fazer login com Google
        </div>
        <button className="flex gap-4 justify-center items-center">
          <Image src={"/google.png"} alt="Google" width={32} height={32} />
          Login com Google
        </button>
      </form>
    </section>
  );
}
