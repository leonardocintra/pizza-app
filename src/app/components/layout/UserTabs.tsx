import Link from "next/link";
import { usePathname } from "next/navigation";

type UserTabProps = {
  isAdmin?: boolean;
};

export default function UserTabs(props: UserTabProps) {
  const path = usePathname();

  return (
    <div className="flex mx-auto gap-2 tabs justify-center mb-5">
      <Link href={"/profile"} className={path === "/profile" ? "active" : ""}>
        Minha Conta
      </Link>
      {props.isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={path === "/categories" ? "active" : ""}
          >
            Categorias
          </Link>
          <Link
            href={"/menu-itens"}
            className={path.includes("menu-itens") ? "active" : ""}
          >
            Itens do Menu
          </Link>
          <Link
            href={"/users"}
            className={path.includes("users") ? "active" : ""}
          >
            Usuários
          </Link>
          <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
            Pedidos
          </Link>
        </>
      )}
    </div>
  );
}
