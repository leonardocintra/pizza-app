"use client";

import { UserProfileAuth } from "@/app/components/UserProfileAuth";
import LeftIcon from "@/app/components/icons/LeftIcon";
import DeleteButton from "@/app/components/layout/Button/DeleteButton";
import MenuItemForm from "@/app/components/layout/MenuItemForm";
import UserTabs from "@/app/components/layout/UserTabs";
import { MenuItemDocument } from "@/app/models/MenuItem";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditarItemPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();
  const { id } = useParams();

  const [menuItems, setMenuItems] = useState<MenuItemDocument>();
  const [redirectPage, setRedirectPage] = useState<boolean>(false);

  useEffect(() => {
    // TODO: fazer um GET by id em vez de trazer tudo e filtrar o id
    fetch("/api/menu-items").then((res) =>
      res.json().then((data) => {
        const item = data.find((i: any) => i._id === id);
        setMenuItems(item);
      })
    );
  }, [id]);

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  if (redirectPage) {
    return redirect("/menu-itens");
  }

  async function handleFormSubmit(ev: any, data: Partial<MenuItemDocument>) {
    ev.preventDefault();

    data = { _id: id, ...data };

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

    setRedirectPage(true);
  }

  async function handleDeleteItem(id: string) {
    const deletePromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch(`/api/menu-items?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
        setRedirectPage(true);
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      loading: "Deletando item...",
      success: "Item excluido com sucesso!",
      error: "Não foi possível excluir o item!",
    });
  }

  return (
    <section className="max-w-lg mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-sm mx-auto">
        <Link className="button" href={"/menu-itens/"}>
          <LeftIcon classname={"w-6 h-6"} />
          Voltar para listagens
        </Link>
      </div>
      <MenuItemForm handleFormSubmit={handleFormSubmit} menuItem={menuItems} />
      <div className=" max-w-md mx-auto mt-4">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Excluir esse item"
            onDelete={() => handleDeleteItem(menuItems?._id)}
          />
        </div>
      </div>
    </section>
  );
}
