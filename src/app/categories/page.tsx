"use client";

import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import toast from "react-hot-toast";
import { CategoryDocument } from "../models/Category";
import TrashIcon from "../components/icons/TrashIcon";
import EditIcon from "../components/icons/EditIcon";
import DeleteButton from "../components/layout/Button/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const { isAdmin, userAdminLoading } = UserProfileAuth();
  const [editedCategory, setEditedCategory] = useState<CategoryDocument | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => {
        setCategories(categories);
      })
    );
  }

  async function handleDeleteCategory(id: string) {
    setEditedCategory(null);
    setCategoryName("");

    const deletePromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
        fetchCategories();
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      loading: "Deletando categoria...",
      success: "Categoria excluida com sucesso!",
      error: "Não foi possível excluir a categoria!",
    });
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
          <div className="pb-3 flex gap-2">
            <button type="submit">
              {editedCategory ? "Editar" : "Salvar"}
            </button>
            <button
              onClick={() => {
                setCategoryName("");
                setEditedCategory(null);
              }}
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-400">Minhas categorias</h2>
        {categories &&
          categories.map((c: CategoryDocument) => (
            <div
              key={c._id}
              className="bg-gray-300 rounded-xl p-2 px-4 flex gap-1 mb-1"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  <EditIcon classname="w-6 h-6" />
                </button>

                <DeleteButton
                  label=""
                  onDelete={() => handleDeleteCategory(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
