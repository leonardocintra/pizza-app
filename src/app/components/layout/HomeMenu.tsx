import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="h-48 w-48 absolute left-0 text-left -top-24 -z-10">
          <Image
            src={"/salada1.png"}
            alt="alface 1"
            width={109}
            height={189}
            priority={false}
          />
        </div>
        <div className="h-48 absolute -top-[100px] right-0 -z-10">
          <Image
            src={"/salada2.png"}
            alt="alface 2"
            width={107}
            height={195}
            priority={false}
          />
        </div>
      </div>

      <SectionHeaders mainHeader="Nossas pizzas" subHeader="Menu" />

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
