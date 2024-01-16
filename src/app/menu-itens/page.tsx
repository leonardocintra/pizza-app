"use client";

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
      <form className="mt-8 max-w-md mx-auto">
        <div className="flex items-start gap-4">
          <div>
            Imagem
          </div>
          <div className="grow">
            <label>Nome do item</label>
            <input type="text" name="item-name" id="item-name" />
            <label>Descrição</label>
            <input type="text" name="item-name" id="item-name" />
            <label>Preço base</label>
            <input type="text" name="item-name" id="item-name" />

            <button type="submit">Salvar</button>
          </div>
        </div>
      </form>
    </section>
  );
}
