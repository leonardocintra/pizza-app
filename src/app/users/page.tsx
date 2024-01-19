"use client";

import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfileAuth } from "../components/UserProfileAuth";
import { UserDocument } from "../models/User";
import Link from "next/link";

export default function UsersPage() {
  const { isAdmin, userAdminLoading } = UserProfileAuth();
  const [users, setUsers] = useState<UserDocument[]>([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((data) => {
        setUsers(data);
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
      <div>
        {users.map((user) => (
          <div
            className="bg-gray-100 rounded-md mb-2 p-2 px-4 items-center flex gap-4"
            key={user._id}
          >
            <div className="grid grid-cols-2 grow gap-4">
              <span>{user.name || "Sem nome"}</span>
              <span className="text-gray-400">{user.email}</span>
            </div>
            <div>
              <Link
                href={`/users/${user._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
