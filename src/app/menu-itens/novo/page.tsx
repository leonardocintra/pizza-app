"use client";

import { UserProfileAuth } from "@/app/components/UserProfileAuth";
import LeftIcon from "@/app/components/icons/LeftIcon";
import MenuItemForm from "@/app/components/layout/MenuItemForm";
import UserTabs from "@/app/components/layout/UserTabs";
import { MenuItemDocument } from "@/app/models/MenuItem";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NovoItemPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();

  const [redirectPage, setRedirectPage] = useState<boolean>(false);

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  if (redirectPage) {
    return redirect("/menu-itens");
  }

  async function handleFormSubmit(ev: any, data: MenuItemDocument) {
    ev.preventDefault();

    if (data.image === "") {
      data.image = "/item-sem-foto.jpg";
    }

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

    setRedirectPage(true);
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
      <MenuItemForm handleFormSubmit={handleFormSubmit} />
    </section>
  );
}
