import Image from "next/image";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 hover:bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-lg hover:shadow-black/75">
      <div className="text-center">
        <Image
          src={"/pizza.png"}
          alt="pizza"
          width={100}
          height={100}
          className="max-h-auto max-h-24 block mx-auto"
          priority={false}
        />
      </div>

      <h4 className="font-semibold my-3 text-xl">Pizza Pepperoni</h4>

      <p className="text-slate-700 text-sm">
        A pizza de pepperoni é uma das pizzas mais populares do mundo. Ela é
        feita com uma massa de pizza, molho de tomate e queijo mussarela, e é
        coberta com fatias de pepperoni.
      </p>
      <button className="bg-primary text-white rounded-full px-8 py-2 mt-4">
        Pedir R$ 36,90
      </button>
    </div>
  );
}
