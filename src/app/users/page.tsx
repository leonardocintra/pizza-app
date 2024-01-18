"use client"

import { useEffect } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";

export default function CategoriesPage() {

  const { isAdmin, userAdminLoading } = UserProfileAuth();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  })

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }



  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      Users
    </section>
  );
}