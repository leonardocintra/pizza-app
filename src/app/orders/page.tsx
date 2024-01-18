"use client"

import { UserProfileAuth } from "../components/UserProfileAuth";
import UserTabs from "../components/layout/UserTabs";

export default function OrdersPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      Pedidos
    </section>
  );
}
