import { ChangeEvent, useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import { SizesType } from "@/app/types/SizesType";
import MenuItemFormProperties from "./MenuItemFormProperties";
import { IngredientsType } from "@/app/types/IngredientsType";
import { MenuItemDocument } from "@/app/models/MenuItem";
import { CategoryDocument } from "@/app/models/Category";

type MenuItemFormProps = {
  handleFormSubmit: any;
  menuItem?: MenuItemDocument;
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
  const [sizes, setSizes] = useState<SizesType[]>(props.menuItem?.sizes || []);
  const [ingredients, setIngredients] = useState<IngredientsType[]>(
    props.menuItem?.ingredients || []
  );
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [category, setCategory] = useState<CategoryDocument | undefined>(
    props.menuItem?.category
  );

  useEffect(() => {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  useEffect(() => {
    if (props.menuItem && categories) {
      setName(props.menuItem.name);
      setDescription(props.menuItem.description);
      setBasePrice(props.menuItem.basePrice);
      setItemImagem(props.menuItem.image);
      setIngredients(props.menuItem.ingredients);
      setSizes(props.menuItem.sizes);
      setCategory(props.menuItem.category);
    }
  }, [categories, props.menuItem]);

  // TODO: bug que nao esta carregando as categoria selecionada
  function onChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories?.find(
      (c) => c._id === selectedCategoryId
    );
    setCategory(selectedCategory);
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
          ingredients,
          sizes,
          category,
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

          <label>Categoria</label>
          <select
            required={true}
            name="category"
            id="category"
            value={category?._id || ""}
            onChange={(e) => onChangeCategory(e)}
          >
            <option value="">Selecione...</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

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
            propName="Descrição"
            propLabel="Tamanhos"
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
