"use client"

import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";

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
      Users
    </section>
  );
}