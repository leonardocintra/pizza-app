"use client";

import { useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import EditableImage from "../components/layout/EditableImage";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();

  const [itemImagem, setItemImagem] = useState<string>("/item-sem-foto.jpg");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<number>(0.0);

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  async function handleFormSubmit(ev: any) {
    ev.preventDefault();

    const data = {
      name,
      description,
      basePrice,
      image: itemImagem,
    };

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: "Salvando item...",
      success: "Item salvo com sucesso!",
      error: "Não foi possível criar/editar o item!",
    });
  }

  return (
    <section className="max-w-lg mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
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

            <button type="submit">Salvar</button>
          </div>
        </div>
      </form>
    </section>
  );
}
