"use client";

import Link from "next/link";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import toast from "react-hot-toast";
import RightIcon from "../components/icons/RigthIcon";

export default function CategoriesPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <section className="max-w-lg mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link className="button" href={"/menu-itens/novo"}>
          Criar novo item
          <RightIcon classname={"w-6 h-6"} />
        </Link>
      </div>
    </section>
  );
}
