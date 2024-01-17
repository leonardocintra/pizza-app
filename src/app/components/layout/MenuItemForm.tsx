import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import { SizesType } from "@/app/types/SizesType";
import MenuItemFormProperties from "./MenuItemFormProperties";
import { IngredientsType } from "@/app/types/IngredientsType";

type MenuItemFormProps = {
  handleFormSubmit: any;
  menuItem: any;
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
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);

  useEffect(() => {
    if (props.menuItem) {
      setName(props.menuItem.name);
      setDescription(props.menuItem.description);
      setBasePrice(props.menuItem.basePrice);
      setItemImagem(props.menuItem.image);
    }
  }, [props.menuItem]);

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

          <MenuItemFormProperties
            propName="Tamanho"
            propLabel="Tamanos do item"
            propsValues={sizes}
            setPropsValues={setSizes}
          />

          <MenuItemFormProperties
            propName="Igredientes"
            propLabel="Igredientes extra"
            propsValues={ingredients}
            setPropsValues={setIngredients}
          />

          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
}
