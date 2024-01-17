import { ChangeEvent, useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlushIcon";

type MenuItemFormProps = {
  handleFormSubmit: any;
  menuItem: any;
};

type SizesType = {
  name: string;
  extraPrice: number;
};

export default function MenuItemForm(props: MenuItemFormProps) {
  const [itemImagem, setItemImagem] = useState<string>(
    props.menuItem?.image || "/item-sem-foto.jpg"
  );
  const [name, setName] = useState<string>(props.menuItem?.name || "");
  const [description, setDescription] = useState<string>(
    props.menuItem?.description || ""
  );
  const [basePrice, setBasePrice] = useState<number>(
    props.menuItem?.basePrice || 0.0
  );
  const [sizes, setSizes] = useState<SizesType[]>([]);

  useEffect(() => {
    if (props.menuItem) {
      setName(props.menuItem.name);
      setDescription(props.menuItem.description);
      setBasePrice(props.menuItem.basePrice);
      setItemImagem(props.menuItem.image);
    }
  }, [props.menuItem]);

  function addSizes() {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", extraPrice: 0 }];
    });
  }

  function removeSize(indexToRemove: number) {
    setSizes((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  function editSize(
    event: ChangeEvent<HTMLInputElement>,
    indexToEdit: number,
    prop: string
  ) {
    setSizes((prevSizes) => {
      return prevSizes.map((size, index) => {
        if (index === indexToEdit) {
          return {
            ...size,
            [prop]: event.target.value,
          };
        }
        return size;
      });
    });
  }

  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(ev) =>
        props.handleFormSubmit(ev, {
          image: itemImagem,
          name,
          description,
          basePrice,
        })
      }
    >
      <div
        className="grid items-start gap-4"
        style={{
          gridTemplateColumns: ".3fr .7fr",
        }}
      >
        <div className="">
          <EditableImage link={itemImagem} setImage={setItemImagem} />
        </div>
        <div className="grow">
          <label>Nome do item</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="item-name"
            id="item-name"
          />
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="item-name"
            id="item-name"
          />
          <label>Preço base</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(parseFloat(e.target.value))}
            name="item-name"
            id="item-name"
          />

          <div className="bg-gray-200 p-2 rounded-md mb-2 text-center">
            <span className="text-gray-600">Tamanhos do item</span>
            <div className="mt-2">
              {sizes?.length > 0 &&
                sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div>
                      <label htmlFor="size">Tamanho</label>
                      <input
                        id="size"
                        name="size"
                        type="text"
                        placeholder="Tamanho ..."
                        value={size.name}
                        onChange={(e) => editSize(e, index, "name")}
                      />
                    </div>
                    <div>
                      <label htmlFor="extraPrice">Preço extra</label>
                      <input
                        id="extraPrice"
                        name="extraPrice"
                        type="text"
                        placeholder="Preço extra ..."
                        value={size.extraPrice}
                        onChange={(e) => editSize(e, index, "extraPrice")}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="mb-3 bg-red-500 text-white px-2"
                      >
                        <TrashIcon classname="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={addSizes}
              type="button"
              className="bg-white items-center"
            >
              <PlusIcon classname="w-6 h-6" />
              Adicionar tamanho
            </button>
          </div>

          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
}
