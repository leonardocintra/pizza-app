"use client";

import { useEffect, useState } from "react";
import { UserProfileAuth } from "@/app/components/UserProfileAuth";
import UserTabs from "@/app/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { UserDocument } from "@/app/models/User";
import UserForm from "@/app/components/layout/UserForm";

export default function UsersPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();
  const { id } = useParams();
  const [user, setUser] = useState<UserDocument>();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        const user = users.find((u: UserDocument) => u._id === id);
        setUser(user);
      });
    });
  });

  if (userAdminLoading) {
    return <div>Validando dados de usuario ...</div>;
  }

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      {user ? <UserForm user={user} /> : <span>Carregando ...</span>}
      <div></div>
    </section>
  );
}
