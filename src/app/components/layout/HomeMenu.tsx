"use client";

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import { MenuItemDocument } from "@/app/models/MenuItem";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState<MenuItemDocument[]>([]);

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((data: MenuItemDocument[]) => {
        const maisVendidas = data.slice(-3);
        setBestSellers(maisVendidas);
      });
    });
  }, []);

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
        {bestSellers?.length > 0 &&
          bestSellers.map((bestSeller) => (
            <MenuItem key={bestSeller._id} item={bestSeller} />
          ))}
      </div>
    </section>
  );
}
