import Image from "next/image";
import RightIcon from "../icons/RigthIcon";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Tudo <br /> é melhor <br /> com {" "}
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza é o que esta faltando para fazer seu dia ficar completo. Uma
          simples deliciosidade para sua vida
        </p>
        <div className="flex gap-4">
          <button className="flex gap-2 bg-primary text-white px-4 py-3 rounded-full uppercase text-sm items-center justify-center">
            Fazer meu pedido <RightIcon classname="w-6 h-6" />
          </button>
          <button className="flex border-0 gap-2 py-2 text-gray-600 font-semibold items-center">
            Mais detalhes <RightIcon classname="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt="pizza"
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    </section>
  );
}
