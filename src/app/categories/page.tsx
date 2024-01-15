"use client";

import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import toast from "react-hot-toast";
import { CategoryDocument } from "../models/Category";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const { isAdmin, userAdminLoading } = UserProfileAuth();
  const [editedCategory, setEditedCategory] = useState<CategoryDocument | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  });

  function fetchCategories() {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => {
        setCategories(categories);
      })
    );
  }

  async function handleCategorySubmit(ev: any) {
    ev.preventDefault();

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: Partial<CategoryDocument> = { name: categoryName };

      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setCategoryName("");
      setEditedCategory(null);

      if (response.ok) {
        resolve();
        fetchCategories();
      } else {
        reject();
      }
    });

    await toast.promise(creationPromise, {
      loading: "Salvando categoria...",
      success: "Categoria salva com sucesso!",
      error: "Não foi possível criar/editar a categoria!",
    });
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

      <form className="max-w-md mx-auto" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? (
                <>
                  Editar categoria: <b>{editedCategory.name}</b>
                </>
              ) : (
                "Criar nova categoria"
              )}
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-3">
            <button type="submit">
              {editedCategory ? "Editar categoria" : "Salvar categoria"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Editar categorias</h2>
        {categories &&
          categories.map((c: CategoryDocument) => (
            <button
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              key={c._id}
              className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
