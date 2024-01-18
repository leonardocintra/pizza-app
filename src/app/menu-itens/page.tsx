"use client";

import Link from "next/link";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import RightIcon from "../components/icons/RigthIcon";
import { useEffect, useState } from "react";
import { MenuItemDocument } from "../models/MenuItem";
import Image from "next/image";

export default function CategoriesPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();

  const [menuItens, setMenuItens] = useState<MenuItemDocument[]>();

  useEffect(() => {
    fetch("/api/menu-items").then((res) =>
      res.json().then((data) => {
        setMenuItens(data);
      })
    );
  }, []);

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link className="button" href={"/menu-itens/novo"}>
          Criar novo item
          <RightIcon classname={"w-6 h-6"} />
        </Link>
      </div>

      <div>
        <h2 className="text-base text-gray-600 mt-8 text-center mb-2">Meus itens do menu</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItens &&
            menuItens.map((item: MenuItemDocument) => (
              <Link
                key={item._id}
                href={`/menu-itens/editar/${item._id}`}
                className="bg-gray-300 rounded-lg p-4"
              >
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <Image
                      priority={false}
                      className="rounded-md"
                      src={item.image}
                      alt={item.name}
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
