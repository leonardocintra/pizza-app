import Image from "next/image";
import MenuItem from "../menu/MenuItem";

export default function HomeMenu() {
  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="h-48 w-48 absolute left-0 text-left -top-24 -z-10">
          <Image src={"/salada1.png"} alt="alface 1" width={109} height={189} />
        </div>
        <div className="h-48 absolute -top-[100px] right-0 -z-10">
          <Image src={"/salada2.png"} alt="alface 2" width={107} height={195} />
        </div>
      </div>
      <div className="text-center mb-4">
        <h3 className="uppercase text-gray-600 font-semibold leading-4">
          Checkout
        </h3>

        <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
