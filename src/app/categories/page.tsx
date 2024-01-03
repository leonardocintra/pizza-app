"use client"

import { useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import toast from "react-hot-toast";

export default function CategoriesPage() {

  const [categoryName, setCategoryName] = useState<string>("");
  const { isAdmin, userAdminLoading } = UserProfileAuth();


  async function handleNewCategory(ev: any) {
    ev.preventDefault();

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: categoryName
        })
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(creationPromise, {
      loading: 'Cadastrando categoria...',
      success: 'Categoria criada com sucesso!',
      error: 'Não foi possível criar a categoria!'
    })

  }

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <section className="max-w-lg mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />

      <form className="max-w-md mx-auto" onSubmit={handleNewCategory}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>Nova categoria</label>
            <input type="text" name="category" id="category" value={categoryName} onChange={(ev) => setCategoryName(ev.target.value)} />
          </div>
          <div className="pb-3">
            <button type="submit">Salvar</button>
          </div>
        </div>
      </form>
    </section>
  );
}