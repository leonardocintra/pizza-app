import { MenuItemDocument } from "@/app/models/MenuItem";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import { IngredientsType } from "@/app/types/IngredientsType";
import { SizesType } from "@/app/types/SizesType";

type MenuItemProps = {
  item: MenuItemDocument;
};

export default function MenuItem(props: MenuItemProps) {
  const cartContext = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<SizesType>();
  const [selectedExtras, setSelectedExtras] = useState<IngredientsType[]>([]);

  if (!cartContext) {
    return (
      <div>
        <h1>Sem cartContext</h1>
      </div>
    );
  }

  const { addToCart } = cartContext;

  function handleAddToCart() {
    if (props.item.sizes.length === 0 && props.item.ingredients.length === 0) {
      toast.success("Item adicionado com sucesso!");
      addToCart(props.item);
    } else {
      setShowPopUp(true);
    }
  }

  function handleExtraThingClick(ev: any, extraThing: IngredientsType) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = props.item.basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.extraPrice;
  }

  if (selectedExtras && selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.extraPrice;
    }
  }

  return (
    <>
      {showPopUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md">
            <Image
              src={props.item.image}
              alt={props.item.name}
              width={300}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">
              {props.item.name}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-2 line-clamp-4">
              {props.item.description}
            </p>

            <div className="mb-2">
              {props.item.sizes.length > 0 && (
                <div className="p-2 rounded-md">
                  <h3 className="text-center pb-2 text-gray-700">
                    Tamanho da pizza
                  </h3>

                  {props.item.sizes.map((size) => (
                    <label
                      key={size.name.trim()}
                      className="flex items-center p-3 m-1 rounded-lg gap-2 border hover:bg-gray-200 transition-colors"
                    >
                      <input
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize === size}
                        type="radio"
                        value={size.name.trim()}
                        name={"tamanho"}
                      />
                      <div className="flex gap-2">
                        <span>{size.name}</span>

                        <span className="font-bold">
                          R$ {size.extraPrice + props.item.basePrice}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {props.item.sizes.length > 0 && (
                <div className="p-2 rounded-md">
                  <h3 className="text-center pb-2 text-gray-700">Adicionais</h3>

                  {props.item.ingredients.map((ing) => (
                    <label
                      key={ing.name.trim()}
                      className="flex items-center p-3 m-1 rounded-lg gap-2 border hover:bg-gray-200 transition-colors"
                    >
                      <input
                        onClick={(ev) => handleExtraThingClick(ev, ing)}
                        type="checkbox"
                        value={ing.name.trim()}
                        name={ing.name}
                      />
                      {ing.name} (+ R$ {ing.extraPrice},00)
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              className="bg-primary rounded-full text-white px-8 py-2"
              type="button"
            >
              Adicionar ao carrinho R$ {selectedPrice}
            </button>
            <button
              onClick={() => setShowPopUp(false)}
              className="mt-1 rounded-full"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <MenuItemTile addToCart={handleAddToCart} item={props.item} />
    </>
  );
}
