import { MenuItemDocument } from "@/app/models/MenuItem";
import Image from "next/image";

type MenuItemTileProps = {
  item: MenuItemDocument;
  addToCart: any;
};

export default function MenuItemTile(props: MenuItemTileProps) {
  return (
    <div className="bg-gray-200 hover:bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-lg hover:shadow-black/75">
      <div className="text-center">
        <Image
          src={props.item.image}
          alt="pizza"
          width={100}
          height={100}
          className="max-h-auto max-h-24 block mx-auto"
          priority={false}
        />
      </div>

      <h4 className="font-semibold my-3 text-xl">{props.item.name}</h4>

      <p className="text-slate-700 text-sm line-clamp-4">
        {props.item.description}
      </p>
      <button
        onClick={props.addToCart}
        className="bg-primary text-white rounded-full px-8 py-2 mt-4"
      >
        Pedir por R$ {props.item.basePrice}
      </button>
    </div>
  );
}
